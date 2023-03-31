import { Link, NavLink } from "react-router-dom";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";
import { config } from "../../utils/config";

import "./Header.css";

export const Header = () => {
  const signOut = useSignOut();

  //@TODO - this needs to be fixed, auth model needs to be changed
  const logout = async () => {
    try {
      const logoutRes = await fetch(`${config.apiUrl}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const logoutData = await logoutRes.json();
    } catch (e) {
      console.error(e);
    }
    //clear auth cookies from react-auth-kit
    signOut();
  };

  return (
    <>
      <div className="Header glass section-head">
        <h1>CargMan app</h1>
        <div className="menu">
          <>
            <button>
              <Link to="/load">Loads</Link>
            </button>
            <button>
              <Link to="/driver">Drivers </Link>
            </button>
          </>
          <button>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </button>

          <Link to="/login">
            <button className="">🔑</button>
          </Link>
        </div>
      </div>
    </>
  );
};
