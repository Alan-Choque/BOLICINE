// hooks/use-current-user.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Importa la interfaz Perfil desde donde la tengas definida (ej. Profiles.types.ts)
// Asegúrate de que la ruta sea correcta según la ubicación de este archivo.
import { Perfil } from "@/app/streaming/(routes)/profiles/components/Profiles/Profiles.types"; // <--- ¡Asegúrate de que esta ruta sea correcta!

// Define la interfaz para el estado de tu hook
interface UseCurrentUser {
  currentUser: Perfil | null; // El usuario actual es ahora de tipo `Perfil`
  changeCurrentUser: (data: Perfil) => void; // La función espera un `Perfil`
}

export const useCurrentNetflixUser = create(
  persist<UseCurrentUser>(
    (set) => ({
      currentUser: null, // Inicialmente no hay perfil seleccionado
      changeCurrentUser: (data: Perfil) => {
        set({ currentUser: data }); // Actualiza el perfil seleccionado
      },
    }),
    {
      name: "current-selected-profile", // Puedes cambiar el nombre del almacenamiento si quieres
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);