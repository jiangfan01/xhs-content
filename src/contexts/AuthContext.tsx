import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  logout as apiLogout,
} from "~/api/auth";
import { AuthContext } from "./auth-context";
import { isLoggedIn, clearAuthData } from "~/utils/auth";
import type { UserInfo } from "~/api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const init = async () => {
      if (!isLoggedIn()) {
        setIsLoading(false);
        return;
      }
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch {
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const onLoginSuccess = useCallback(async () => {
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch {
      clearAuthData();
    }
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    clearAuthData();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        onLoginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
