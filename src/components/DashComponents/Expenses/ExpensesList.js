import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No Expense Found!</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense._id}
          id={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          role={expense.role}
          status={expense.status}
          email={expense.email}
          owner = {expense.owner}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
