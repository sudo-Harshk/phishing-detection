import base64
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from app.config import VIRUSTOTAL_API_KEY

_VT_BASE = "https://www.virustotal.com/api/v3"
_HEADERS = {"x-apikey": VIRUSTOTAL_API_KEY}

_POLL_INTERVAL = 2
_MAX_POLLS = 3


def _url_id(url: str) -> str:
    """Base64url-encode a URL without padding, as required by VT API."""
    return base64.urlsafe_b64encode(url.encode()).decode().rstrip("=")


def _map_stats(stats: dict) -> dict:
    """Map VT last_analysis_stats → { label, risk_level, phishing_probability }."""
    malicious = stats.get("malicious", 0)
    suspicious = stats.get("suspicious", 0)
    harmless = stats.get("harmless", 0)
    undetected = stats.get("undetected", 0)
    total = malicious + suspicious + harmless + undetected

    if total == 0:
        prob = 0.05
    elif malicious > 0:
        ratio = malicious / total
        prob = min(0.60 + ratio * 0.40, 1.0)
    else:
        ratio = suspicious / total
        prob = ratio * 0.59

    if prob >= 0.85:
        label, risk = "Phishing", "High"
    elif prob >= 0.60:
        label, risk = "Suspicious", "Moderate"
    else:
        label, risk = "Clean", "Low"

    return {"label": label, "risk_level": risk, "phishing_probability": round(prob, 4)}


def _fetch_url_report(url: str) -> dict | None:
    """GET /urls/{id} — returns last_analysis_stats or None if not ready."""
    resp = requests.get(f"{_VT_BASE}/urls/{_url_id(url)}", headers=_HEADERS, timeout=15)
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    attrs = resp.json().get("data", {}).get("attributes", {})
    stats = attrs.get("last_analysis_stats")
    return stats if stats else None


def _poll_analysis(analysis_id: str) -> dict | None:
    """Poll GET /analyses/{id} until completed, return stats or None."""
    for _ in range(_MAX_POLLS):
        time.sleep(_POLL_INTERVAL)
        resp = requests.get(f"{_VT_BASE}/analyses/{analysis_id}", headers=_HEADERS, timeout=15)
        resp.raise_for_status()
        attrs = resp.json().get("data", {}).get("attributes", {})
        if attrs.get("status") == "completed":
            return attrs.get("stats")
    return None


def _fetch_domain_info(hostname: str) -> dict | None:
    """GET /domains/{hostname} — returns enriched domain intelligence or None."""
    try:
        resp = requests.get(f"{_VT_BASE}/domains/{hostname}", headers=_HEADERS, timeout=15)
        if resp.status_code in (404, 400):
            return None
        resp.raise_for_status()
        attrs = resp.json().get("data", {}).get("attributes", {})

        # Creation date: unix timestamp → "YYYY-MM-DD"
        created = None
        ts = attrs.get("creation_date")
        if ts:
            try:
                created = datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%d")
            except Exception:
                pass

        # Categories: dict of {engine: label} → deduped list
        raw_cats = attrs.get("categories", {})
        categories = sorted(set(v for v in raw_cats.values() if v)) if raw_cats else []

        # Engine stats from domain's last_analysis_stats
        domain_stats = attrs.get("last_analysis_stats", {})
        engines_malicious = domain_stats.get("malicious", 0)
        engines_suspicious = domain_stats.get("suspicious", 0)
        engines_harmless = domain_stats.get("harmless", 0)
        engines_undetected = domain_stats.get("undetected", 0)
        engines_total = engines_malicious + engines_suspicious + engines_harmless + engines_undetected

        return {
            "registrar": attrs.get("registrar") or None,
            "country": attrs.get("country") or None,
            "created": created,
            "categories": categories,
            "reputation": attrs.get("reputation"),
            "engines_malicious": engines_malicious,
            "engines_suspicious": engines_suspicious,
            "engines_harmless": engines_harmless,
            "engines_total": engines_total,
        }
    except Exception:
        return None


def scan_url(url: str) -> dict:
    """
    Submit URL to VirusTotal and return a result dict compatible with the
    existing predict response shape plus a domain_info field.
    """
    if not VIRUSTOTAL_API_KEY:
        raise RuntimeError("VIRUSTOTAL_API_KEY is not configured")

    t0 = time.time()

    # 1. Submit URL for scanning (required to trigger/refresh analysis)
    submit_resp = requests.post(
        f"{_VT_BASE}/urls",
        headers=_HEADERS,
        data={"url": url},
        timeout=15,
    )
    submit_resp.raise_for_status()
    analysis_id = submit_resp.json().get("data", {}).get("id", "")

    # 2. Fetch URL report and domain info concurrently
    from urllib.parse import urlparse
    hostname = urlparse(url).hostname or ""

    url_stats: dict | None = None
    domain_info: dict | None = None

    with ThreadPoolExecutor(max_workers=2) as pool:
        fut_url = pool.submit(_fetch_url_report, url)
        fut_domain = pool.submit(_fetch_domain_info, hostname) if hostname else None

        url_stats = fut_url.result()
        domain_info = fut_domain.result() if fut_domain else None

    # 3. Poll if URL report not cached yet
    if url_stats is None and analysis_id:
        url_stats = _poll_analysis(analysis_id)

    latency_ms = round((time.time() - t0) * 1000, 2)

    if url_stats is None:
        return {
            "label": "Unknown",
            "risk_level": "Low",
            "phishing_probability": 0.0,
            "latency_ms": latency_ms,
            "model": "VirusTotal v3",
            "domain_info": domain_info,
        }

    result = _map_stats(url_stats)
    result["latency_ms"] = latency_ms
    result["model"] = "VirusTotal v3"
    result["domain_info"] = domain_info
    return result
