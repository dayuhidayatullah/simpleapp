import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="flex justify-between bg-gray-800">
      <div
        onClick={() => window.location.assign("/")}
        className="flex h-12 items-center gap-3 ml-5 cursor-pointer"
      >
        {/* <a href="/"> */}
        <img src="https://flowbite.com/images/logo.svg"></img>
        <span className="flex justify-center items-center text-xl font-semibold text-gray-900 dark:text-white">
          SimpleApp
        </span>
        {/* </a> */}
      </div>
      <div
        onClick={() => window.location.assign("/")}
        className="block flex items-center py-2 text-sm font-medium text-gray-900 lg:px-3 lg:py-0 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 mr-5 cursor-pointer"
      >
        Beranda
      </div>
    </section>
  );
}

export default Header;
