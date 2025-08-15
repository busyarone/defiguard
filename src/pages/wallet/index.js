import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import "./index.css";

import Header from "../../components/header";
import BlogSection from "../../components/blog";
import Footer from "../../components/footer";

function Wallet() {
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setStatus("Wallet connected!");
      } catch (err) {
        setStatus("Connection failed.");
      }
    } else {
      setStatus("MetaMask not detected.");
    }
  };

  // Send ETH
  const sendEth = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask not detected.");
      return;
    }
    if (!recipient || !amount) {
      setStatus("Recipient and amount required.");
      return;
    }
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
      });
      setStatus("Transaction sent!");
    } catch (err) {
      setStatus("Transaction failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ethereum Wallet</h2>
      <button className="btn btn-primary mb-3" onClick={connectWallet}>
        Connect Wallet
      </button>
      {account && (
  <div>
    <p>
      <strong>Your Address:</strong> {account}
      <button
        className="btn btn-outline-secondary btn-sm ms-2"
        onClick={() => {
          navigator.clipboard.writeText(account);
          setStatus("Address copied to clipboard!");
        }}
      >
        Copy
      </button>
    </p>
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Recipient Address"
      value={recipient}
      onChange={(e) => setRecipient(e.target.value)}
    />
    <input
      type="number"
      className="form-control mb-2"
      placeholder="Amount (ETH)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <button className="btn btn-success" onClick={sendEth}>
      Send ETH
    </button>
  </div>
)}
      <p className="mt-3">{status}</p>
    </div>
  );
}

export default Wallet;