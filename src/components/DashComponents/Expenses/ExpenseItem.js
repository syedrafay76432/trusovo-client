import React, { useContext } from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate.js";
import Card from "../UI/Card";
import AuthContext from "../../../store/auth-context.js";
import axios from "axios";

const ExpenseItem = (props) => {
  const cancelHandler = async () => {
    ctx.onCancel(props.id);
    // await axios
    //   .patch(
    //     `https://trusovo-server.vercel.app/tasks/${props.id}`,
    //     { status: "canceled" },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${ctx.token}`,
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     // console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred while caceling:", error);
    //   });
  };
  const completeHandler = async () => {
    ctx.onComplete(props.id);
    // await axios
    //   .patch(
    //     `https://trusovo-server.vercel.app/tasks/${props.id}`,
    //     {
    //       status: "completed",
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${ctx.token}`,
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     // console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred while completing:", error);
    //   });
  };
  const ctx = useContext(AuthContext);
  return (
    <li>
      <Card className="expense-item">
        <div><ExpenseDate date={props.date} /></div>
        <div className="expense-item__description">
          <h2> {props.title} </h2>
          <div className="expense-item__price"> {props.amount} </div>
          <div className="expense-item__price"> {props.role} </div>
          {props.status === "in_progress" ? (
            <div>
              <button onClick={cancelHandler}>cancel</button>
              <button onClick={completeHandler}>Done</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
