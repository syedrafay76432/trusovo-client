import React, { useContext, useEffect, useState } from "react";
import Expenses from "./DashComponents/Expenses/Expenses";
import NewExpense from "./DashComponents/NewExpense/NewExpense";
import axios from "axios";
import AuthContext from "../store/auth-context";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const ctx = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("https://trusovo-server.vercel.app/tasks", {
        headers: {
          Authorization: `Bearer ${ctx.token}`,
        },
      })
      .then((data) => {
        setExpenses(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ctx.token,ctx.expenseItemRerender]); //Here we call API to fetch Transactions from backend

  const addExpenseHandler = (expense) => {
    // expenses.push(expense); Here we Call API to add Transaction
    axios
      .post("https://trusovo-server.vercel.app/tasks", expense, {
        headers: {
          Authorization: `Bearer ${ctx.token}`,
        },
      })
      .then((data) => {
        setExpenses((prevExpense) => {
          return [expense, ...prevExpense];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default Dashboard;
