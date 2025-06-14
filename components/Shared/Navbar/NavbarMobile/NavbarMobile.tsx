"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Shared/Logo";
import { itemsNavbar } from "@/data/itemsNavbar";
import { BellRing, Menu, Search, X } from "lucide-react"; // 1. Importar el icono X
import Link from "next/link";
import { useState, useRef, useEffect } from "react"; // 2. Importar hooks
import { NavbarMobileProps } from "./NavbarMobile.types";
import { SelectorProfile } from "@/components/Shared/SelectorProfile";

export function NavbarMobile(props: NavbarMobileProps) {
    const { users } = props;
    // 3. Estado para manejar el "modo búsqueda"
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // 4. Efecto para enfocar el input cuando se abre
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            // Un pequeño delay puede ayudar a que la UI se renderice antes de enfocar
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isSearchOpen]);

    return (
        <div className="p-4 flex justify-between items-center h-16 fixed top-0 left-0 right-0 bg-black z-40">
            <Logo />
            <div className="flex items-center gap-4">
                {/* Opcional: Icono de búsqueda en la barra principal también */}
                {/* <Search onClick={() => setIsSearchOpen(true)} className="md:hidden" /> */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button>
                            <Menu />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-black p-4">
                        <div className="flex flex-col h-full">
                            {/* Perfil y navegación principal */}
                            <div className="mb-5">
                                <SelectorProfile users={users} />
                            </div>
                            <div className="flex flex-col gap-4">
                                {itemsNavbar.map((item) => (
                                    <Link key={item.name} href={item.link} className="hover:text-gray-300 transition-all duration-300 text-lg">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-[1px] border-white/20 my-5" />

                            {/* Contenido del pie de la hoja (Sheet) */}
                            <div className="mt-auto">
                                {/* 5. Lógica de renderizado condicional para la búsqueda ✨ */}
                                {isSearchOpen ? (
                                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Buscar..."
                                            className="bg-gray-800 text-white rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <X
                                            onClick={() => setIsSearchOpen(false)}
                                            className="cursor-pointer text-gray-400 hover:text-white"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-around items-center gap-6 animate-in fade-in duration-300">
                                        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setIsSearchOpen(true)}>
                                            <Search />
                                            <span className="text-xs">Buscar</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <BellRing />
                                            <span className="text-xs">Noticias</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}