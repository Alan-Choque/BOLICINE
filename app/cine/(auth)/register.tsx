"use client";

import { useState, useEffect } from "react";

interface RegProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Register({ isOpen, onClose }: RegProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje("Registro exitoso");
      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 1500);
    } else {
      setMensaje(data.error || "Error al registrarse");
    }
  };

  return (
    <div className="absolute w-screen h-screen bg-white p-12 overflow-y-auto z-50">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 text-gray-600 hover:text-gray-800 z-20"
      >
        <span className="sr-only">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="max-w-sm mx-auto pt-8">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
          Registrate
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Ingresa tu nombre de usuario, correo y contraseña.
        </p>

        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="relative py-5">
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-0 border-b-2 border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:outline-none bg-transparent placeholder-gray-400"
                placeholder="Usuario"
                required
              />
            </div>

            <div  className="relative py-5">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b-2 border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:outline-none bg-transparent placeholder-gray-400"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative py-5">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 border-b-2 border-gray-300 p-3 text-gray-700 focus:border-red-500 focus:outline-none bg-transparent placeholder-gray-400"
                placeholder="Contraseña"
                required
              />
              <button className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-300 py-4 text-lg font-semibold text-gray-800 hover:bg-red-500 transition-colors"
            >
              Registrarse
            </button>
          </form>

          <div className="space-y-3">
            <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors">
              <img
                src="https://www.facebook.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2 h-5 w-5"
              />
              Facebook
            </button>

            <button className="flex w-full items-center justify-center rounded-lg bg-gray-200 py-4 text-lg font-medium text-black hover:bg-blue-50 transition-colors">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2 h-5 w-5"
              />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
