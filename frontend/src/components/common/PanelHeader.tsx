interface PanelHeaderProps {
  title: string;
  subtitle: string;
}

export default function PanelHeader({ title, subtitle }: PanelHeaderProps) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-slate-600 mt-1">
        {subtitle}
      </p>
    </div>
  );
}
