import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

import "./Header.css";

export const Header = () => {
  const signOut = useSignOut();

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
    <div className="header glass section-head">
      <h1>Carg management app</h1>
      <p>
        <Link to="/load">Loads</Link>
      </p>
      <p>
        <Link to="/driver">Drivers </Link>
      </p>

      <p>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </p>
    </div>
  );
};
