"use client";
import { cn } from "@/lib/utils";

import { BellRing, Search } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/Shared/Logo";
import { itemsNavbar } from "@/data/itemsNavbar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function NavbarDesktop(){
    const scrollPosition = useScrollPosition();
    console.log(scrollPosition);
    return(
        <div className={cn("z-30 left-0 right-0 top-0 fixed w-full transition-all duration-300", scrollPosition > 20 ? "bg-black" : "bg-transparent")}>
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between h-full items-center">
                    <div className="flex gap-2 items-center">
                        <Logo/>
                        <div className="ml-10 flex gap-4">
                            {itemsNavbar.map((item =>
                                <Link key={item.name} href={item.link} className="hover:text-gray-300 transition-all duration-300">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Search className="cursor-pointer"/>
                        <BellRing className="cursor-pointer"/>
                        <div className="flex gap-2 items-center">
                            {/*TODO: Add user profile image*/}
                            <p>User</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
