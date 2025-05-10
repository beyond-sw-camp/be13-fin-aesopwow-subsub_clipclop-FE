// /presentation/components/atoms/PanelTitle.tsx
interface PanelTitleProps {
  title: string;
  className?: string;
}

export function PanelTitle({ title, className = "text-lg font-semibold mb-2" }: PanelTitleProps) {
  return <h2 className={className}>{title}</h2>;
}