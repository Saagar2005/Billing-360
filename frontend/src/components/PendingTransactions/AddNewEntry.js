import React, { useState } from "react";
import Modal from "react-modal";

const AddNewEntry = ({ isVisible, onCancel, entryType, handlePageUpdate }) => {
  const [Data, setData] = useState({
    partyName: "",
    phoneNumber: "",
    email: "",
    amount: 0,
  });

  const handleInputChange = (key, value) => {
    setData({ ...Data, [key]: value });
    console.log(Data);
  };

  const handleSave = () => {
    if (Data.amount > 0) {
      if (entryType === "Customer") addNewCredit();
      else addNewDebit();
    } else {
      onCancel();
      alert("Amount must greater than zero!");
    }
  };

  const addNewCredit = () => {
    fetch("http://localhost:5050/api/pendingTransactions/addNewCredit", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((result) => {
        alert("Successfully added new customer!");
        fetch("http://localhost:5050/api/invoice/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userID: result.body.userID,
            invoiceID: 0,
            customerName: result.body.name,
            phoneNo: result.body.phoneNo,
            customerEmail: result.body.email,
            totalAmount: Data.amount,
            notes: "Amount added to credit",
            paymentMode: "Credit",
            discount: 0,
            itemList: [],
            createdAt: new Date(),
          }),
        })
          .then((result) => {
            alert("Invoice ADDED");
            console.log(result);
            handlePageUpdate();
            onCancel();
            setData({ partyName: "", phoneNumber: "", email: "", amount: 0 });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const addNewDebit = () => {
    fetch("http://localhost:5050/api/pendingTransactions/addNewDebit", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((result) => {
        alert("Successfully added new supplier!");
        handlePageUpdate();
        onCancel();
        setData({ partyName: "", phoneNumber: "", email: "", amount: 0 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={isVisible}
      contentLabel="New Entry Dialog"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust overlay opacity as needed
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "400px", // Adjust modal width as desired
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <h2>New Entry</h2> {/* Heading */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
          onCancel();
        }}
      >
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            value={Data.partyName}
            name="partyName"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="phoneNo">Phone Number:</label>
          <input
            type="text"
            value={Data.phoneNumber}
            name="phoneNumber"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            value={Data.email}
            name="email"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            value={Data.amount}
            name="amount"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="form-control"
            style={{
              width: "90%",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>
        <div
          className="button-group"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0 5px",
          }}
        >
          <button
            type="submit"
            style={{
              width: "45%",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              width: "45%",
              backgroundColor: "#eee",
              color: "#333",
              border: "1px solid #ccc",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewEntry;