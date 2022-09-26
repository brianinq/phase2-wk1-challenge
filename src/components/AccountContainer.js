import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  function addTransaction(e, newTransaction) {
    let id = transactions.length + 1;
    newTransaction = { ...newTransaction, id };
    e.preventDefault();
    e.target.reset();

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions((transactions) => [...transactions, data]);
      });
  }

  function searchHandler(e) {
    setTransactions((transactions) => {
      return transactions.filter((transaction) => {
        return transaction.description.toLowerCase().includes(e.target.value.toLowerCase());
      });
    });
  }

  return (
    <div>
      <Search searchHandler={searchHandler} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
