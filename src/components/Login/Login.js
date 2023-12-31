import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: " ", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: " ", isValid: false };
};

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [wrongEmail, setWrongEmail] = useState("");
  const [emailstate, dispatchemail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordstate, dispatchpassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailisValid } = emailstate;
  const { isValid: passwordisValid } = passwordstate;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailisValid && passwordisValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailisValid, passwordisValid]);

  const emailChangeHandler = (event) => {
    dispatchemail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailstate.isValid && passwordstate.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailstate.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchemail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchpassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      await ctx.onLogin({
        email: emailstate.value,
        password: passwordstate.value,
      });
      if (ctx.isLoggedIn === false) {
        setWrongEmail("Invalid E-mail or Password");
      }
    } else if (!emailisValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <p className={classes.p}>{wrongEmail}</p>
        <Input
          ref={emailRef}
          id="email"
          type="email"
          label="E-mail"
          isValid={emailisValid}
          value={emailstate.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordRef}
          id="password"
          type="password"
          label="Password"
          isValid={passwordisValid}
          value={passwordstate.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
