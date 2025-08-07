"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { type User, type Role } from "@/lib/types";
import { useRouter } from "next/navigation";

const MOCK_USERS: Record<string, Omit<User, 'uid' | 'email'>> = {
  'teacher@example.com': { name: 'John Doe', role: 'teacher' },
  'admin@example.com': { name: 'Jane Smith', role: 'admin' },
  'hod@example.com': { name: 'Peter Jones', role: 'hod' },
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const userData = MOCK_USERS[email.toLowerCase()];
        if (userData) {
          const newUser: User = {
            uid: `user-${Date.now()}`,
            email,
            ...userData,
          };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          router.push("/dashboard");
          resolve(true);
        } else {
          setUser(null);
          localStorage.removeItem("user");
          resolve(false);
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  }, [router]);

  const switchRole = useCallback((role: Role) => {
    if (user) {
      // In a real app, you might validate if the user is allowed to switch to this role.
      // Here, we find a mock user with that role to switch to for demo purposes.
      const mockEmail = Object.keys(MOCK_USERS).find(email => MOCK_USERS[email].role === role);
      if (mockEmail) {
        const userData = MOCK_USERS[mockEmail];
        const newUser: User = {
          uid: `user-${Date.now()}`,
          email: mockEmail,
          ...userData,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    }
  }, [user]);

  const value = { user, loading, login, logout, switchRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
