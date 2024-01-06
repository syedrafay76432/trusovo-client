import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  dashboard: true,
  SignupForm: false,
  ShowSignupForm: () => {},
  HideSignupForm: () => {},
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (loginData) => {},
  Signup: (SignupData) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [dashboard, setDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [SignupForm, setSignupForm] = useState(false);

  useEffect(() => {
    //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    //   if (storedUserLoggedInInformation === "1") {
    //     setIsLoggedIn(true);
    //   }

    // Attach the onBeforeUnload function to the beforeunload event
    window.addEventListener("beforeunload", logoutHandler);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", logoutHandler);
    };
  }, []);

  const logoutHandler = async () => {
    // localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    await axios
      .post("https://trusovo-server.vercel.app/users/logout")
      .then((data) => {})
      .catch((error) => {
        console.error("An error occurred while logging out:", error);
      });
  };

  const loginHandler = async (loginData) => {
    // console.log(loginData);
    await axios
      .post("https://trusovo-server.vercel.app/users/login", loginData)
      .then((data) => {
        console.log(data.data.token); // Success message from the server
        setToken(data.data.token);
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("An error occurred while logging in:", error);
      });
  };
  const showDashboard = () => {
    setDashboard(true);
  };
  const hideDashboard = () => {
    setDashboard(false);
  };
  const ShowSignupFormHandler = () => {
    setSignupForm(true);
  };

  const HideSignupFormHandler = () => {
    setSignupForm(false);
  };
  const Signup = async (signupData) => {
    console.log(signupData);
    await axios
      .post("https://trusovo-server.vercel.app/users", signupData)
      .then((data) => {
        console.log(data.data); // Success message from the server
        setSignupForm(false);
      })
      .catch((error) => {
        console.error("An error occurred while Signing up:", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        dashboard: dashboard,
        isLoggedIn: isLoggedIn,
        SignupForm: SignupForm,
        showDasboard: showDashboard,
        hideDasboard: hideDashboard,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        ShowSignupForm: ShowSignupFormHandler,
        HideSignupForm: HideSignupFormHandler,
        onSignup: Signup,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
