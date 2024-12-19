import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" flex justify-between ">
      <div>
        <NavLink to="/" className="font-bold text-5xl">
          Travelling Salesman
        </NavLink>
      </div>

      <div className="flex justify-between gap-32 items-center font-semibold text-[20px] mr-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hover:scale-110 transition-all duration-500 bg-card rounded-3xl px-4 py-2 scale-125"
              : "hover:scale-110 transition-all duration-500 bg-card rounded-3xl px-4 py-2"
          }
        >
          Home
        </NavLink>
        {/*<Link className="hover:scale-125 duration-500">Visualizer</Link>*/}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "hover:scale-110 transition-all duration-500 bg-card rounded-3xl px-4 py-2 scale-125"
              : "hover:scale-110 transition-all duration-500 bg-card rounded-3xl px-4 py-2"
          }
        >
          About
        </NavLink>

        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center px-4 py-2 bg-card hover:bg-orange-500 rounded-md focus:outline-none ring-2 ring-offset-2 ring-orange-300"
          >
            Options
            <svg
              className="ml-2 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-700">
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-700"
              >
                Problem1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-orange-100 hover:text-orange-700"
              >
                Problem2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-orange-100 hover:orange-green-700"
              >
                Problem2
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
