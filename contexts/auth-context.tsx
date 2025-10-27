import React, { createContext, useContext } from "react";

// Minimal placeholder user type, expand as needed
export interface AuthUser {
  id: string;
  email: string;
}

// Minimal context value, expand as needed
interface AuthContextValue {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Placeholder state
  const value: AuthContextValue = {
    user: null,
    login: () => {},
    logout: () => {},
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
