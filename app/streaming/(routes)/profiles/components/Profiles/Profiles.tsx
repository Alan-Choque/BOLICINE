"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ProfilesProps } from "./Profiles.types";
import { AddProfile } from "./AddProfile/AddProfile";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";
import { UsuarioPerfil } from "./Profiles.types";

export function Profiles(props: ProfilesProps) {
    const { users } = props;
    const { changeCurrentUser } = useCurrentNetflixUser();

    const [manageProfiles, setManageProfiles] = useState(false);
    const router = useRouter();

    const onClickUser = (user: UsuarioPerfil) => {
        changeCurrentUser(user); // esto depende de cómo tengas el contexto de usuario
        router.push("/");
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.request({
            url: "/api/usuario",
            method: "DELETE",
            data: { id_usuario: userId },
            });

            setManageProfiles(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Ops! Ha ocurrido un error");
        }
    };

    return (
        <div>
        <div className="flex gap-7">
            {users.map((user) => (
            <div
                key={user.id_usuario}
                className="text-center relative cursor-pointer"
                onClick={() => onClickUser(user)}
            >
                <Image
                src={user.foto_perfil || ""}
                alt={`Profile Image ${user.nombre}`}
                width={140}
                height={140}
                className={cn(
                    manageProfiles ? "blur-md" : "",
                    "border-transparent hover:border-2 hover:border-white rounded-md"
                )}
                />
                <p className="mt-2 text-gray-500 uppercase text-lg">
                {user.nombre}
                </p>

                <div
                className={cn(
                    "top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20",
                    manageProfiles ? "absolute" : "hidden"
                )}
                >
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <div className="bg-white rounded-full hover:bg-red-100 p-1">
                        <Trash2 className="w-6 h-6 text-red-500" />
                    </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                        ¿Seguro que quieres eliminar este perfil?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Volver</AlertDialogCancel>
                        <AlertDialogAction
                        className="text-red-500 border-red-500 border"
                        onClick={() => deleteUser(user.id_usuario)}
                        >
                        Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>
            </div>
            ))}

            <AddProfile />
        </div>

        <div className="mt-16 flex items-center justify-center">
            <Button
            variant="outline"
            size="lg"
            className="text-gray-500 border-gray-500"
            onClick={() => setManageProfiles(!manageProfiles)}
            >
            Administrar perfiles
            </Button>
        </div>
        </div>
    );
}
