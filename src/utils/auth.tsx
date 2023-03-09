import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

interface AuthContextInterface {
  user: any;
  isLoggedIn: boolean | undefined;
  login: (user: any) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const navigate = useNavigate();

  const login = async (user: any) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log("data", data);

      setUser(user);
      setIsLoggedIn(true);
      console.log(user);
      console.log(isLoggedIn);

      if (isLoggedIn) {
        navigate("/drivers");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      const logoutRes = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const logoutInfo = await logoutRes.json();
      console.log(logoutInfo);

      setUser(null);
      setIsLoggedIn(false);
      console.log(user);
      console.log(isLoggedIn);

      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
