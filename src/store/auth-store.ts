import create from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  prayerTimeIdlebTimeAdminToken: string | null;
  adminName: string | null;
  adminEmail: string | null;
  login: (prayerTimeIdlebTimeAdminToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      prayerTimeIdlebTimeAdminToken:
        Cookies.get("prayerTimeIdlebTimeAdminToken") || null,
      adminName: Cookies.get("adminName") || null,
      adminEmail: Cookies.get("adminEmail") || null,
      login: (prayerTimeIdlebTimeAdminToken: string) => {
        Cookies.set(
          "prayerTimeIdlebTimeAdminToken",
          prayerTimeIdlebTimeAdminToken,
          { expires: 365 }
        );
        set({ prayerTimeIdlebTimeAdminToken });
      },

      logout: () => {
        Cookies.get("prayerTimeIdlebTimeAdminToken") &&
          Cookies.remove("prayerTimeIdlebTimeAdminToken");
        set({ prayerTimeIdlebTimeAdminToken: null });
      },
    }),
    {
      name: "delivery-dashboard-wael-tarabishi-storage",
    }
  )
);
