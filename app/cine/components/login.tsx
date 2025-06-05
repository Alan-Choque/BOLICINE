"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Register from "./register";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Login({ isOpen, onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [isRegOpen, setIsRegOpen] = useState(false);

  const toggleRegister = () => {
    setIsRegOpen(!isRegOpen);
  };

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
      setMensaje("Login exitoso");
      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 1500);
    } else {
      setMensaje(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-full w-full rounded-xl shadow-lg overflow-hidden">
        {/* Lado izquierdo */}
        <div className="w-1/2 bg-red-500 p-12 text-white overflow-y-auto relative">
          {/* Elemento decorativo curvo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full bg-red-600 rounded-full opacity-30"></div>
            </div>
            <div className="absolute -right-20 top-1/3 transform -translate-y-1/2 w-80 h-80">
              <div className="w-full h-full bg-red-700 rounded-full opacity-40"></div>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="mb-6 text-5xl font-extrabold leading-tight">
              ¿YA ERES PARTE DE <br />
              <span className="text-white">CINEBOL ?</span>
            </h2>

            <p className="mb-4 text-xl font-semibold">
              El mejor programa de recompensas que premia tu diversión.
            </p>

            <p className="mb-8 text-lg">
              Regístrate aquí y empieza a disfrutar la experiencia de ser
              miembro Cinebol.
            </p>

            <div className="space-y-4 text-base">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">💯</span>
                </div>
                <span>Acumula puntos en cada una de tus compras.</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">🎫</span>
                </div>
                <span>
                  Canjea tus puntos por boletos en la taquilla y productos en
                  dulcería.
                </span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">👥</span>
                </div>
                <span>Todos los martes 2x1.</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">🍿</span>
                </div>
                <span>Combo Lunes y Jueves a precio preferencial.</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">🎁</span>
                </div>
                <span>Recibe regalos en el mes de tu cumpleaños.</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">🥤</span>
                </div>
                <span>Refill de palomitas y/o refresco a precio especial.</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs font-bold">🎪</span>
                </div>
                <span>Promociones todos los días.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho (formulario) */}
        <div className="relative w-1/2 bg-white p-12 overflow-y-auto">
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
              ¡HOLAAA!
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Ingresa con tu usuario y contraseña.
            </p>

            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div>
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
                  Ingresar
                </button>
              </form>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="space-y-3">
                <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors">
                  <img
                    src="https://www.facebook.com/favicon.ico"
                    alt="Facebook Icon"
                    width={20}
                    height={20}
                    className="mr-2 h-5 w-5"
                  />
                  Facebook
                </button>

                <button className="flex w-full items-center justify-center rounded-lg bg-gray-200 py-4 text-lg font-medium text-black hover:bg-blue-50 transition-colors">
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google Icon"
                    width={20}
                    height={20}
                    className="mr-2 h-5 w-5"
                  />
                  Google
                </button>
              </div>
              <p className="text-center text-base pt-4">
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  onClick={toggleRegister}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Register isOpen={isRegOpen} onClose={toggleRegister} />
    </div>
  );
}
