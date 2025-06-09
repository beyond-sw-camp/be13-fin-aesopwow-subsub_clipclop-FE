interface ProfileProps {
    name: string;
    company: string;
  }
  
  export function Profile({ name, company }: ProfileProps) {
    return (
      <div className="text-center">
        <div className="mt-4 text-2xl font-bold">{name}</div>
        <div className="mt-1 text-base text-gray-600">{company}</div>
      </div>
    );
  }