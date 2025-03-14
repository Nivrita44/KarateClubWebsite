import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/instructors">
          <li className="py-1">ALL INSTRUCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT CLUB</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="py-1"
          >
            EVENTS
          </button>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-lg border">
              <NavLink
                to="/events/previous"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Previous Events
              </NavLink>
              <NavLink
                to="/events/upcoming"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Upcoming Events
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/gallery">
          <li className="py-1">GALLERY</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p className="hover:text-black cursor-pointer">My Classes</p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Join Us
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
