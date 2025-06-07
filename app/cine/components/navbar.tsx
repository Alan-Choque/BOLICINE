// src/app/components/Navbar.tsx
"use client";

import { useState } from "react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Login from "./login";
import Link from "next/link";
import { itemsNavbar } from "@/data/itemsNavbar";

const navigation = [
  { name: "Inicio", href: "/", current: false },
  { name: "Cartelera", href: "/cine/cartelera", current: false },
  { name: "Candy Bar", href: "/cine/candyBar", current: false },
  { name: "Mis compras", href: "/cine/compras", current: false },
  { name: "Cinebol +", href: "/streaming", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <nav className="bg-gray-900 z-10 text-white shadow fixed w-full">
        <div className="mx-auto justify-between max-w-7xl px-2 sm:px-10 lg:px-10 flex-row">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/images/logo cinebol.png"
                alt="CINEBOL"
                width={100}
                height={100}
              />
            </Link>

            {/* Enlaces de navegación */}
            <div className="hidden space-x-4 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900"
                      : "hover:bg-white-700 hover:text-red-500",
                    "text-white rounded-md px-3 py-2 text-lg font-medium",
                    "rounded-md px-3 py-2 text-lg font-medium text-black"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Ícono de perfil */}
            <div className="items-center hidden md:flex">
              <button
                type="button"
                onClick={toggleLogin}
                className="relative rounded-full bg-white p-1 text-red-500 hover:text-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <Bars3Icon
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none md:hidden h-6 w-6 hover:bg-gray-800"
            />
          </div>
        </div>

        {/* Login */}
        <Login isOpen={isLoginOpen} onClose={toggleLogin} />

        {menuOpen && (
          <div className="md:hidden px-2 pb-3 space-y-1 flex flex-col items-end bg-gray-900 text-white animate-accordion-down">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900"
                    : "hover:bg-white-700 hover:text-red-500",
                  "text-white rounded-md px-3 py-2 text-lg font-medium",
                  "rounded-md px-3 py-2 text-lg font-medium text-black"
                )}
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleLogin}
              className="relative py-2 px-3 text-white hover:text-red-500 font-black text-2xl cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
