import React from "react";
import { LoadsList } from "../Load/LoadsList";

import "./Header.css";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

export const Header = () => {
  const signOut = useSignOut();

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
        <Link to="/" onClick={signOut}>
          Sign Out
        </Link>
      </p>
    </div>
  );
};
