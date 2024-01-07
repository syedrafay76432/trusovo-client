import React, { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpenseList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [filteredStatus, setFilteredStatus] = useState("in_progress");

  const filterChangeHandler = (selectedStatus) => {
    setFilteredStatus(selectedStatus);
  };
  const filteredExpenses = props.items.filter((expense) => {
    return expense.status === filteredStatus;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredStatus}
          onChangeFilter={filterChangeHandler}
        />
        {/* <ExpensesChart expenses={filteredExpenses} /> */}
        
        <ul className="listHeading">
          <li>Date</li>
          <li>Title</li>
          <li></li>
          <li></li>
          <li>Amount</li>
          <li>Role</li>
          <li>Status</li>
        </ul>
  
        <ExpenseList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
