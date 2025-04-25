// /utils/PageBreadcrumb.tsx
import { Link } from "react-router-dom";

export function PageBreadcrumb() {
  return (
    <div className="text-sm font-medium text-white space-x-1">
      <Link
        to="/analytics"
        className="text-white font-bold hover:underline hover:decoration-white hover:font-extrabold hover:text-white"
      >
        Analytics
      </Link>
      <span className="text-white">/</span>
      <Link
        to="/analytics/cohorts"
        className="text-white font-bold hover:underline hover:decoration-white hover:font-extrabold hover:text-white"
      >
        Cohorts
      </Link>
    </div>
  );
}