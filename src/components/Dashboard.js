import React, { useEffect, useState } from "react";
import Expenses from "./DashComponents/Expenses/Expenses";
import NewExpense from "./DashComponents/NewExpense/NewExpense";

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
  // useEffect(()=>{},[]) Here we call API to fetch Transactions from backend
  const [expenses, setExpenses] = useState(DUMMY_TRANSACTIONS);
  const addExpenseHandler = (expense) => {
    // expenses.push(expense); Here we Call API to add Transaction
    setExpenses((prevExpense) => {
      return [expense, ...prevExpense];
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
