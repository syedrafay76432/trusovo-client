import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  SignupForm: false,
  ShowSignupForm: () => {},
  HideSignupForm: () => {},
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  Signup: () => {},
});

export const AuthContextProvider = (props) => {
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

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const ShowSignupFormHandler = () => {
    setSignupForm(true);
  };

  const HideSignupFormHandler = () => {
    setSignupForm(false);
  };
  const Signup = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        SignupForm: SignupForm,
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
