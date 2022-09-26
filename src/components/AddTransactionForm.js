import React, { useState } from "react";

function AddTransactionForm({ addTransaction }) {
  const [formData, setFrormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  function changeHandler(e) {
    setFrormData((formData) => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  }
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={(e) => addTransaction(e, formData)}>
        <div className="inline fields">
          <input type="date" name="date" onBlur={changeHandler} />
          <input type="text" name="description" placeholder="Description" onBlur={changeHandler} />
          <input type="text" name="category" placeholder="Category" onBlur={changeHandler} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" onBlur={changeHandler} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
