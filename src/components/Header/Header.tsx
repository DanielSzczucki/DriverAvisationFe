import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";

import "./Header.css";

export const Header = () => {
  const signOut = useSignOut();
  const isAuth = useIsAuthenticated();

  //@TODO - this needs to be fixed, auth model needs to be changed
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
    } catch (e) {
      console.error(e);
    }

    //clear auth cookies from react-auth-kit
    signOut();
  };

  return (
    <div className="Header glass section-head">
      <h1>CargMan app</h1>

      {isAuth() ? (
        <>
          <button>
            <Link to="/load">Loads</Link>
          </button>
          <button>
            <Link to="/driver">Drivers </Link>
          </button>
        </>
      ) : null}

      {isAuth() ? (
        <button>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </button>
      ) : null}
    </div>
  );
};
