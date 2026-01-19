interface PanelHeaderProps {
  title: string;
  subtitle: string;
}

export default function PanelHeader({ title, subtitle }: PanelHeaderProps) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}
