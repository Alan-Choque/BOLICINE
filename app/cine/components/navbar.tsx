// src/app/components/Navbar.tsx
"use client";

import { useState } from "react";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import Login from "./login"; // Importa el componente Modal
import Link from "next/link";

const navigation = [
  { name: "Inicio", href: "/cine", current: false },
  { name: "Cartelera", href: "/cine/cartelera", current: false },
  { name: "Candy Bar", href: "/cine/candyBar", current: false },
  { name: "Mis compras", href: "/cine/compras", current: false },
  { name: "Cinebol +", href: "/cine/streaming", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900  text-white shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-10 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <Image
                src="/logoNegativo.png"
                alt="CINEBOL"
                width={40}
                height={40}
              />
              <span className="ml-2 text-lg font-extrabold text-red-500">
                CINEBOL
              </span>
            </div>

            {/* Enlaces de navegación */}
            <div className="flex space-x-4">
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
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleLogin}
                className="relative rounded-full bg-white p-1 text-red-500 hover:text-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login */}
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
    </>
  );
}
