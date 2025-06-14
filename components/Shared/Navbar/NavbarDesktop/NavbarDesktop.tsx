"use client";
import { cn } from "@/lib/utils";
import { BellRing, Search, X } from "lucide-react"; // Importamos X para cerrar
import Link from "next/link";
import Image from "next/image"; // Para mostrar las imágenes en los resultados
import { useState, useRef, useEffect } from "react";

import { Logo } from "@/components/Shared/Logo";
import { itemsNavbar } from "@/data/itemsNavbar";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { NavbarDesktopProps } from "./NavbarDesktop.types";
import { SelectorProfile } from "@/components/Shared/SelectorProfile";
import { useDebounce } from "@/hooks/useDebounce"   ; // <-- 1. IMPORTAMOS EL HOOK DEBOUNCE
import { Movie } from "@/types/movies"; // <-- 2. IMPORTAMOS EL TIPO MOVIE

export function NavbarDesktop(props: NavbarDesktopProps) {
    const { users } = props;
    const scrollPosition = useScrollPosition();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- INICIO: LÓGICA DE BÚSQUEDA (NUEVO) ---

    // 3. ESTADOS PARA LA BÚSQUEDA
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 4. APLICAMOS DEBOUNCING A LA CONSULTA
    // Solo actualiza este valor si el usuario deja de escribir por 500ms
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // 5. USEEFFECT PARA LLAMAR A LA API CUANDO LA CONSULTA CAMBIE
    useEffect(() => {
        // Si la consulta "debounced" no está vacía, buscamos
        if (debouncedSearchQuery) {
            setIsLoading(true);
            fetch(`/api/search?q=${debouncedSearchQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    setSearchResults(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching search results:", err);
                    setIsLoading(false);
                });
        } else {
            // Si la consulta está vacía, limpiamos los resultados
            setSearchResults([]);
        }
    }, [debouncedSearchQuery]); // <-- Este efecto depende de la consulta "retrasada"

    // --- FIN: LÓGICA DE BÚSQUEDA ---

    // Cerramos la búsqueda y limpiamos los resultados al hacer clic fuera
    useOnClickOutside(searchRef, () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    });

    return (
        <div className={cn("z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300", scrollPosition > 20 ? "bg-black" : "bg-transparent")}>
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between h-full items-center">
                    <div className="flex gap-2 items-center">
                        <Logo />
                        <div className="ml-10 hidden md:flex gap-4">
                            {itemsNavbar.map((item) => (
                                <Link key={item.name} href={item.link} className="hover:text-gray-300 transition-all duration-300">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        {/* 7. Lógica del buscador animado ✨ */}
                        <div ref={searchRef} className=" relative flex items-center h-9">
                            <Search
                                className={cn(
                                    "absolute top-1/2 left-2 -translate-y-1/2 text-white transition-colors z-10 cursor-pointer",
                                    // Hacemos que solo sea un puntero cuando la búsqueda está cerrada
                                    !isSearchOpen && "cursor-pointer hover:text-white"
                                )}
                                onClick={() => {
                                    if (!isSearchOpen) {
                                        setIsSearchOpen(true);
                                    }
                                }}
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={isSearchOpen ? "Títulos, personas, géneros" : ""}
                                className={cn(
                                    // Estilos base para el input
                                    "bg-black outline-none rounded-sm border h-full",
                                    "text-white transition-all duration-300 ease-in-out",

                                    // Lógica de la animación
                                    isSearchOpen
                                        ? "w-64 opacity-100 pl-9 border-white" // Abierto: se expande y añade padding para el icono
                                        : "w-9 opacity-0 border-transparent"  // Cerrado: ancho mínimo para contener el icono, pero invisible
                                )}
                                // Opcional: Cierra al presionar 'Escape'
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        setIsSearchOpen(false);
                                    }
                                }}
                            />
                        </div>

                        <BellRing className="cursor-pointer" />
                        <div className="flex gap-2 items-center">
                            <SelectorProfile users={users} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
