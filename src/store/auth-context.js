import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
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
  const [dashboard, setDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [SignupForm, setSignupForm] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = async (loginData) => {
    console.log(loginData);
    // await axios
    //   .post("http://localhost:5000/users/login", loginData)
    //   .then((data) => {
    //     console.log(data); // Success message from the server
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred while logging in:", error);
    //   });
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
  const Signup = (signupData) => {
    console.log(signupData);
    // axios
    //   .post("http://localhost:5000/users", signupData)
    //   .then((data) => {
    //     console.log(data); // Success message from the server
    setSignupForm(false);
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred while Signing up:", error);
    //   });
  };

  return (
    <AuthContext.Provider
      value={{
        dashboard : dashboard,
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
