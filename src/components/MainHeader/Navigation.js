import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <button className={classes.menuBtn} onClick={ctx.hideDasboard}>
            Home
          </button>
        </li>

        <li>
          <button className={classes.menuBtn} onClick={ctx.showDasboard}>
            Dashboard
          </button>
        </li>

        <li>
          <button className={classes.btn} onClick={ctx.onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
