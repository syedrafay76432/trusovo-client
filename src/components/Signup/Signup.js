import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Signup.module.css";
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

const Signup = (props) => {
  const nameRef = useRef();
  const publicKeyRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [publicKey, setPublicKey] = useState("");
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

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const publicKeyChangeHandler = (event) => {
    setPublicKey(event.target.value);
  };
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
      try {
        await ctx.onSignup({
          name: name,
          email: emailstate.value,
          password: passwordstate.value,
        });
      } catch (error) {
        setWrongEmail("Invalid E-mail or Email already exist!");
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
          ref={nameRef}
          id="name"
          type="name"
          onChange={nameChangeHandler}
          label="Name"
        />
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
        <Input
          ref={publicKeyRef}
          id="publicKey"
          type="publicKey"
          onChange={publicKeyChangeHandler}
          label="Public Key"
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Signup
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Signup;
