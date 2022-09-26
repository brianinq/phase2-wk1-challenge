import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
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
    setSearch(e.target.value);
  }

  const filteredTransactions = transactions.filter((transaction) => transaction.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div>
      <Search search={search} searchHandler={searchHandler} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
