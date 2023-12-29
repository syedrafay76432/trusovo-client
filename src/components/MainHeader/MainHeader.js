import React, { useContext } from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes["main-header"]}>
      <div>
        <img src="/logo.png" alt="" />
        <h1>Trusovo</h1>
      </div>
      {!ctx.isLoggedIn && !ctx.SignupForm && (
        <button className={classes.abc} onClick={ctx.ShowSignupForm}>
          Signup
        </button>
      )}
      {!ctx.isLoggedIn && ctx.SignupForm && (
        <button className={classes.abc} onClick={ctx.HideSignupForm}>
          Login
        </button>
      )}
      {ctx.isLoggedIn && <Navigation />}
    </header>
  );
};

export default MainHeader;
