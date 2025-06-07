import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define UserNetflix interface locally or import from the correct module
interface UserNetflix {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface UseCurrentUser {
  currentUser: UserNetflix | null;
  changeCurrentUser: (data: UserNetflix) => void;
}

export const useCurrentNetflixUser = create(
  persist<UseCurrentUser>(
    (set) => ({
      currentUser: null,
      changeCurrentUser: (data: UserNetflix) => {
        set({ currentUser: data });
      },
    }),
    {
      name: "current-netflix-user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
