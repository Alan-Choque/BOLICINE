import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Movie } from "@/types/movies";
import { toast } from "sonner";
import { useCurrentNetflixUser } from "./use-current-user";

interface UseAddFilmMyList {
    lovedFilmsByUser: { [userId: string]: Movie[] };
    addLovedFilm: (data: Movie) => void;
    removeLovedItem: (id: number) => void;
    }

    export const useLovedFilms = create(
    persist<UseAddFilmMyList>(
        (set, get) => ({
        lovedFilmsByUser: {},

        addLovedFilm: (data: Movie) => {
            const { currentUser } = useCurrentNetflixUser.getState(); // Get the current user

            if (!currentUser) {
            return toast.success("Ningún usuario seleccionado 🙋‍♂️");
            }

            const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];
            const existingItem = currentLovedItems.find(
            (item: Movie) => item.id_pelicula === data.id_pelicula
            );

            if (existingItem) {
            return toast.error("La película ya está en tu lista 😊");
            }

            set({
            lovedFilmsByUser: {
                ...get().lovedFilmsByUser,
                [currentUser.id]: [...currentLovedItems, data],
            },
            });

            toast.success("Película añadida a tu lista 🚀");
        },

        removeLovedItem: (id: number) => {
            const { currentUser } = useCurrentNetflixUser.getState();

            if (!currentUser) {
            return toast.error("Ningún usuario seleccionado 🙋‍♂️");
            }

            const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];

            set({
            lovedFilmsByUser: {
                ...get().lovedFilmsByUser,
                [currentUser.id]: currentLovedItems.filter(
                (item) => item.id_pelicula !== id
                ),
            },
            });

            toast.success("La película ha sido eliminada de tu lista 😢");
        },
        }),
        {
        name: "add-loved-films-by-user",
        storage: createJSONStorage(() => localStorage),
        }
    )
);