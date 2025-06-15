import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Perfil } from "@/app/streaming/(routes)/profiles/components/Profiles/Profiles.types";
interface UseCurrentUser {
  currentUser: Perfil | null;
  changeCurrentUser: (data: Perfil) => void;
}

export const useCurrentNetflixUser = create(
  persist<UseCurrentUser>(
    (set) => ({
      currentUser: null,
      changeCurrentUser: (data: Perfil) => {
        set({ currentUser: data });
      },
    }),
    {
      name: "current-selected-profile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);