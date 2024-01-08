import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  publicKey: "",
  dashboard: true,
  expenseItemRerender: false,
  SignupForm: false,
  ShowSignupForm: () => {},
  HideSignupForm: () => {},
  isLoggedIn: false,
  onLogout: () => {},
  onCancel: (id) => {},
  onComplete: (id) => {},
  onLogin: (loginData) => {},
  Signup: (SignupData) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [dashboard, setDashboard] = useState(false);
  const [expenseItemRerender, setExpensesItemRerender] = useState(false);
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
      .post(
        "https://trusovo-server.vercel.app/users/logoutAll",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {})
      .catch((error) => {
        console.error("An error occurred while logging out:", error);
      });
  };

  const onCancel = async (id) => {
    // console.log(loginData);
    await axios
      .patch(
        `https://trusovo-server.vercel.app/tasks/${id}`,
        { status: "canceled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        // console.log(data);
        setExpensesItemRerender(data);
      })
      .catch((error) => {
        console.error("An error occurred while caceling:", error);
      });
  };
  const onComplete = async (id) => {
    // console.log(loginData);
    await axios
      .patch(
        `https://trusovo-server.vercel.app/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        // console.log(data);
        setExpensesItemRerender(data);
      })
      .catch((error) => {
        console.error("An error occurred while completing:", error);
      });
  };

  const loginHandler = async (loginData) => {
    // console.log(loginData);
    await axios
      .post("https://trusovo-server.vercel.app/users/login", loginData)
      .then((data) => {
        setToken(data.data.token);
        setPublicKey(data.data.publicKey);
        console.log(data.data.publicKey);
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
        throw new Error("Error while signing up");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        dashboard: dashboard,
        expenseItemRerender: expenseItemRerender,
        isLoggedIn: isLoggedIn,
        SignupForm: SignupForm,
        showDasboard: showDashboard,
        hideDasboard: hideDashboard,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        ShowSignupForm: ShowSignupFormHandler,
        HideSignupForm: HideSignupFormHandler,
        onSignup: Signup,
        onCancel: onCancel,
        onComplete: onComplete,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
