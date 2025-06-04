// /utils/PageBreadcrumb.tsx
interface PageBreadcrumbProps {
  title: string;
}

export function PageBreadcrumb({ title }: PageBreadcrumbProps) {
  return (
    <div className="text-2xl font-bold text-white">
      {title}
    </div>
  );
}
