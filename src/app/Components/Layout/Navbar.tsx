"use client";
import React, { useState } from "react";

const Navbar = () => {

const[menuClosed, menuOpen] = useState(false)

  return (
    <nav className="Navbar p-6">
      <div className="Navbtn flex justify-between p-2">
        <ul className="Navlinks flex gap-10">
          <img src="./logo1.jpg" />
          <li>
            <a className="hover:text-red-500" href="/">
              Inicio
            </a>
          </li>
          <li>
            <a className="hover:text-red-500" href="/">
              Streaming
            </a>
          </li>
          <li>
            <a className="hover:text-red-500" href="/">
              Boletos
            </a>
          </li>
          <li>
            <a className="hover:text-red-500" href="/">
              Promociones
            </a>
          </li>
        </ul>
        <button
          className="BtnLogin bg-red-500 rounded-full hover:bg-amber-400 size-10"
          type="button"
          onClick={() => menuOpen(menuClosed)}
        >
          <img className="" src="./cuenta.png" alt="" />
        </button>
        <div className={`absolute xl:hidden w-full flex flex-col`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
