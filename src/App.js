import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";
import classes from "./App.module.css";
import Dashboard from "./components/Dashboard";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main className={classes.main}>
        {!ctx.isLoggedIn && ctx.SignupForm && <Signup />}
        {!ctx.isLoggedIn && !ctx.SignupForm && <Login />}
        {ctx.isLoggedIn && ctx.dashboard && <Dashboard></Dashboard>}
        {ctx.isLoggedIn && !ctx.dashboard && <Home></Home>}
      </main>
      <Footer />
    </>
  );
}

export default App;
