import React, { useContext, useEffect, useState } from "react";
import Expenses from "./DashComponents/Expenses/Expenses";
import NewExpense from "./DashComponents/NewExpense/NewExpense";
import axios from "axios";
import AuthContext from "../store/auth-context";

const DUMMY_TRANSACTIONS = [
  {
    id: "e1",
    title: "Mobile App",
    date: new Date(2023, 7, 14),
    amount: 94.12,
    role: "seller",
    status: "completed",
  },
  {
    id: "e2",
    title: "Web App",
    date: new Date(2023, 7, 14),
    amount: 94.12,
    role: "buyer",
    status: "canceled",
  },
  {
    id: "e3",
    title: "Add features",
    date: new Date(2023, 7, 14),
    amount: 94.12,
    role: "seller",
    status: "in_progress",
  },
  {
    id: "e4",
    title: "Logo Designing",
    date: new Date(2023, 7, 14),
    amount: 94.12,
    role: "seller",
    status: "completed",
  },
  {
    id: "e5",
    title: "Bikea App",
    date: new Date(2023, 7, 14),
    amount: 43.122,
    role: "buyer",
    status: "canceled",
  },
];

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
        console.log(data.data);
        setExpenses(data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ctx.token]); //Here we call API to fetch Transactions from backend

  const addExpenseHandler = (expense) => {
    // expenses.push(expense); Here we Call API to add Transaction
    // setExpenses((prevExpense) => {
    //   return [expense, ...prevExpense];
    // });


    axios
      .post("https://trusovo-server.vercel.app/tasks",expense ,{
        headers: {
          Authorization: `Bearer ${ctx.token}`,
        },
      })
      .then((data) => {
        console.log(data);
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
