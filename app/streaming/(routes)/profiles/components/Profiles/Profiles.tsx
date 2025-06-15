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
import { Perfil } from "./Profiles.types";

export function Profiles(props: ProfilesProps) {
    const { users } = props;
    const { changeCurrentUser } = useCurrentNetflixUser();

    const [manageProfiles, setManageProfiles] = useState(false);
    const router = useRouter();
    const onClickUser = (user: Perfil) => { 
        changeCurrentUser(user);
        router.push("/streaming");
    };

    const deleteProfile = async (profileIdToDelete: number) => {
        try {
        await axios.request({
            method: 'DELETE',
            url: '/api/usuarios',
            data: { profileId: profileIdToDelete }
        });
        toast.success("Perfil eliminado correctamente."); 
        setManageProfiles(false);
        router.refresh();
        } catch (error: any) { 
        console.error("Error al eliminar perfil:", error);
        const errorMessage = error.response?.data?.message || "Ops! Ha ocurrido un error al eliminar el perfil.";
        toast.error(errorMessage);
        }
    };

    return (
        <div>
        <div className="flex gap-7">
            {users.map((user) => (
            <div
                key={user.id}
                className="text-center relative cursor-pointer"
                onClick={() => onClickUser(user)}
            >
                <Image
                src={user.avatarUrl || ""}
                alt={`Profile Image ${user.profileName}`}
                width={140}
                height={140}
                className={cn(
                    manageProfiles ? "blur-md" : "",
                    "border-transparent hover:border-2 hover:border-white rounded-md"
                )}
                />
                <p className="mt-2 text-gray-500 uppercase text-lg">
                {user.profileName}
                </p>

                <div
                className={cn(
                    "top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20",
                    manageProfiles ? "absolute" : "hidden"
                )}
                onClick={(e) => {
                    if(manageProfiles) {
                        e.stopPropagation();
                    }
                }}
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
                        onClick={() => deleteProfile(user.id)}
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
