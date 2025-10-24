import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="navbar sticky top-0 bg-yellow-300 z-10 px-3 py-2 justify-end flex ">
        <Link to="/" className="mr-3 underline">
          Home
        </Link>
        <Link to="/aura-farmers" className="mr-3 underline">
          All Aura Farmers
        </Link>
        <Link to="/aura-farmers/search" className="mr-3 underline">
          Search
        </Link>
      </nav>

      <div className="mx-8">
        <Outlet />
      </div>
    </div>
  );
}
