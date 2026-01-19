# Product Requirements Document (PRD)

## 1. Product Overview

**Product Name**: Phishing Detection Web Interface
**Project Type**: MTech Final Year Project (Research Demonstration)

### Purpose

Build a **stable, demo-ready web application** that demonstrates phishing email detection using **character-level deep learning models**, validating the results presented in the associated research paper.

The system is intended to:

* Showcase model behavior
* Demonstrate feasibility of character-level phishing detection
* Provide interpretable outputs in a controlled environment

This is **not** a production email filtering system.

---

## 2. Goals & Non-Goals

### Goals

* Accept raw email text as input
* Classify input as **Phishing** or **Clean**
* Display a **confidence score**
* Use **CharGRU (adversarial-trained)** as the default model
* Maintain fast, CPU-only inference
* Support a smooth, failure-resistant live demo

### Non-Goals

* Real-world deployment or email inbox integration
* Guarantee of correctness on arbitrary emails
* Handling encrypted, binary, or proprietary email formats
* Large-scale traffic handling

---

## 3. Target Users

* Academic evaluators (project demo panel)
* Researchers reviewing the paper
* Students exploring phishing detection approaches

Primary user mode is **guided demo**, not free exploration.

---

## 4. Core Functional Requirements

### 4.1 Input Handling

**Supported Inputs**:

* Plain text pasted into a text area
* Optional: `.txt` or `.eml` file upload (non-critical)

**Preprocessing Requirements**:

* Strip HTML tags by default
* Remove common email headers (From, To, Subject, Date)
* Truncate input to **1500 characters**
* Normalize case and whitespace
* Map characters to a fixed **95-symbol alphabet**

**Validation Rules**:

* Empty input → reject with error message
* Input <50 characters → show warning
* High unknown-character ratio (>20%) → show warning

---

### 4.2 Model Inference

**Primary Model**:

* CharGRU (adversarial-trained)

**Inference Behavior**:

* CPU-only execution
* Batch size = 1
* Warmed up at server startup

**Output**:

* Binary label: `Phishing` or `Clean`
* Confidence score (0–1)
* Inference latency (ms)

---

### 4.3 Explanation (Optional)

**Feature**: Character-level influence visualization (Grad-CAM–style)

**Behavior**:

* Disabled by default
* Computed asynchronously after prediction
* Highlight only top-influence characters
* Automatically hidden if unstable or slow

**Framing**:

* Visualizes *relative influence*, not causality

---

## 5. Non-Functional Requirements

### Performance

* End-to-end response time <2 seconds
* Inference latency <500ms (P95)

### Reliability

* System must not crash on malformed input
* Partial results are acceptable if explanations fail

### Usability

* Clear labels and warnings
* Minimal controls visible in demo mode
* Preloaded example emails available

---

## 6. Demo Mode Requirements

A **Demo Mode** must be supported with the following behavior:

* CharGRU (adversarial) locked as default
* Preloaded anonymized examples available
* Cached predictions for examples
* Optional explanation enabled only for examples
* Fallback button to validated example inputs

This mode is the **primary evaluation path**.

---

## 7. Edge Cases & Expected Behavior

| Case                | Expected Behavior                      |
| ------------------- | -------------------------------------- |
| Empty input         | Error message, no inference            |
| Very short text     | Warning shown, inference allowed       |
| HTML-heavy input    | HTML stripped, notice shown            |
| Long email          | Truncated, warning shown               |
| Unicode-heavy text  | Unknown char warning                   |
| Explanation failure | Prediction shown without visualization |

---

## 8. Technical Architecture

### Backend

* FastAPI (Python 3.10)
* TensorFlow/Keras (CPU)
* Global model cache
* REST endpoint: `POST /api/predict`

### Frontend

* React (preferred) or Streamlit (fallback)
* Single-page demo flow
* Minimal styling

---

## 9. Success Criteria

### Minimum Acceptable Demo

* User can run prediction on sample email
* Correct label and confidence shown
* No crashes during demo

### Successful Demo

* Live email input handled gracefully
* Explanation shown for at least one example
* System behavior matches paper claims

---

## 10. Risks & Mitigations

| Risk                  | Mitigation                     |
| --------------------- | ------------------------------ |
| Model loading failure | Version pinning, early testing |
| Slow explanations     | Optional + async               |
| Uncontrolled input    | Sanitization + warnings        |
| Demo instability      | Demo Mode + cached examples    |

---

## 11. Out of Scope (Explicit)

* Retraining models
* Real-time email monitoring
* Spam filtering beyond phishing
* Automated remediation or blocking

---

## 12. Final Statement

This PRD defines a **controlled, demo-oriented phishing detection system** that faithfully implements the proposed character-level models, highlights their strengths, acknowledges limitations, and prioritizes stability and clarity for academic evaluation.
