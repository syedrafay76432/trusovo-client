import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredPeriod, setEnteredPeriod] = useState("");
  const [enteredRole, setEnteredRole] = useState("Buyer");
  const [enteredDescribtion, setEnteredDescribtion] = useState("");
  const [enteredDate, setEnteredDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const itemChangeHandler = (event) => {
    setEnteredItem(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const describtionChangeHandler = (event) => {
    setEnteredDescribtion(event.target.value);
  };
  const periodChangeHandler = (event) => {
    setEnteredPeriod(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const roleChangeHandler = (event) => {
    setEnteredRole(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault(); // to prevent default behaviour so it stops sending requests

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      role: enteredRole,
      status: "in_progress",
      email: enteredEmail
    };
    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredDescribtion("");
    setEnteredRole("");
    setEnteredPeriod("");
    setEnteredEmail("")
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            required
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            required
            type="number"
            value={enteredAmount}
            min="1"
            step="0.1"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input required type="date" value={enteredDate} id="readOnlyInput" />
        </div>
        <div className="new-expense__control">
          <label>Inspection period (days)</label>
          <input
            required
            type="number"
            value={enteredPeriod}
            min="1"
            step="1"
            onChange={periodChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Role</label>
          <select value={enteredRole} onChange={roleChangeHandler}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <div className="new-expense__control">
          <label>Item Category</label>
          <select value={enteredRole} onChange={roleChangeHandler}>
            <option value="Domain">Domain</option>
            <option value="Website">Website</option>
            <option value="Computer Hardware and Software">
              Computer Hardware and Software
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Cosmetic">Cosmetic</option>
            <option value="Vehicles">Vehicles</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="new-expense__control">
          <label>Item Name</label>
          <input
            required
            type="text"
            value={enteredItem}
            onChange={itemChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Second party E-mail</label>
          <input
            required
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Item Description</label>
          <textarea
            name="description"
            id=""
            cols="70"
            rows="10"
            value={enteredDescribtion}
            onChange={describtionChangeHandler}
          ></textarea>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add Item</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
