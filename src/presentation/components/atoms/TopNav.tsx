// @/presentation/components/atoms/TopNav.tsx

import { Link } from "react-router-dom";

export function TopNav() {
  return (
    <div className="w-full flex justify-center py-4 text-white text-sm font-semibold space-x-10">
      <Link to="/aboutus" className="text-white no-underline">About Us</Link>
      <Link to="/membership" className="text-white no-underline">Membership</Link>
      <Link to="/howto" className="text-white no-underline">How To?</Link>
    </div>
  );
}
