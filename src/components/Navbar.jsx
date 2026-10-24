import { Link, NavLink, useNavigate } from "react-router-dom";
import { GraduationCap, Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
export default function Navbar({ user, theme, toggleTheme, logout }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Dashboard", "/dashboard"],
    ["Universities", "/universities"],
    ["Compare", "/compare"],
    ["Cost planner", "/cost"],
    ["Deadlines", "/deadlines"],
    ["Documents", "/documents"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-white">
            <GraduationCap size={23} />
          </span>
          <span className="text-lg font-black tracking-tight dark:text-white">
            Admit<span className="text-teal-600">Flow</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `navlink ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          {user?.role === "parent" && (
            <NavLink to="/parent" className="navlink">
              Parent view
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-secondary !p-2"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <span className="hidden text-sm font-semibold md:inline dark:text-slate-200">
                {user.name}
              </span>
              <button
                className="btn btn-secondary !p-2"
                title="Log out"
                onClick={logout}
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link
                className="hidden rounded-lg px-3 py-2 text-sm font-bold text-slate-700 sm:inline dark:text-slate-200"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="btn btn-primary !px-3 !py-2 text-sm"
                to="/register"
              >
                Get started
              </Link>
            </>
          )}
          <button
            className="btn btn-secondary !p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-slate-200 px-4 py-3 dark:border-slate-800 lg:hidden">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              onClick={() => setOpen(false)}
              to={path}
              className="navlink rounded-lg px-3 py-2"
            >
              {label}
            </NavLink>
          ))}
          {!user && (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="navlink px-3 py-2"
            >
              Log in
            </Link>
          )}
          {user?.role === "parent" && (
            <Link
              onClick={() => setOpen(false)}
              to="/parent"
              className="navlink px-3 py-2"
            >
              Parent view
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
