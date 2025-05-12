interface SectionTitleProps {
    title: string;
  }
  
  export function SectionTitle({ title }: SectionTitleProps) {
    return (
      <h2 className="text-lg font-semibold border-b border-purple-500 pb-1 mb-4">
        {title}
      </h2>
    );
  }
  