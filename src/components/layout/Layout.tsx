import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav className="navbar sticky top-0 bg-yellow-300 z-10 px-3 py-2 flex lg:justify-between justify-center items-center flex-col lg:flex-row">
          <div className="text-lg font-bold italic">
            🔥 Best Aura Farmer
          </div>
          <div>
            <Link to="/" className="mr-3 underline">
              Home
            </Link>
            <Link to="/aura-farmers" className="mr-3 underline">
              All Aura Farmers
            </Link>
          </div>
        </nav>
      </header>

      <main className="px-2 py-6 container mx-auto">
        <Outlet />
      </main>
    </>
  );
}
