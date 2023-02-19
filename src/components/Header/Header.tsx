import React from "react";
import { LoadsList } from "../Load/LoadsList";

import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header glass">
      <h1>Carg management app</h1>
      <p>
        <Link to="/load">Loads 📦</Link>
      </p>
      <p>
        <Link to="/driver">Drivers 🚚</Link>
      </p>
    </div>
  );
};
