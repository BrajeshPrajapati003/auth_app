import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";
import { loginUser, logoutUser } from "@/services/AuthService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

// type AuthStatus = "idle" | "authenticating" | "authenticated" | "anonymous";

type LoginRequestData = {
  accessToken: string;
  user: User;
};

// Global auth state
type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;

  login: (LoginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  authLoading: boolean;
  checkLogin: () => boolean;
};

// Main logic for global state
const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,
      login: async (loginData) => {
        console.log("Started login...");
        try {
          set({ authLoading: true });
          const LoginResponseData = await loginUser(loginData);
          console.log(LoginResponseData);

          set({
            accessToken: LoginResponseData.accessToken,
            user: LoginResponseData.user,
            authStatus: true,
          });

          return LoginResponseData;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },
      logout: async (silent = false) => {
        if (get().authLoading) return; // prevent double logout

        set({ authLoading: true }); // authLoading should be set before async work

        try {
          if (!silent) {
            await logoutUser(); // Backend logout
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Always clear local state
          set({
            accessToken: null,
            user: null,
            authLoading: false,
            authStatus: false,
          });
        }
      },
      checkLogin: () => {
        const { accessToken, authStatus } = get();
        return !!accessToken && authStatus;

        //!   If these two ever get out of sync -> that can cause ghost login bugs.
      },
    }),
    { name: LOCAL_KEY },
  ),
);

export default useAuth;
