import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <button className={classes.menuBtn} href="/">Home</button>
        </li>

        <li>
          <button className={classes.menuBtn} href="/">Dashboard</button>
        </li>
        <li>
          <button className={classes.menuBtn} href="/">Start New Transaction</button>
        </li>

        <li>
          <button className={classes.btn} onClick={ctx.onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
