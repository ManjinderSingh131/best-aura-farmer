import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav className="navbar sticky top-0 bg-yellow-300 z-10 px-3 py-2 justify-end flex ">
          <Link to="/" className="mr-3 underline">
            Home
          </Link>
          <Link to="/aura-farmers" className="mr-3 underline">
            All Aura Farmers
          </Link>
        </nav>
      </header>

      <main className="px-2 container mx-auto">
        <Outlet />
      </main>
    </>
  );
}
