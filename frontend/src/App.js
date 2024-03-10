
import React from "react"
import Dashboard from "./Dashboard.js";
import SignUp from "./SignUp.js";
import Inventory from "./Inventory.js";
import ContactUs from "./ContactUs.js";
import Invoice from  "./Invoice.js";
import PendingTransactions from "./Pending transaction.js";
import Register from "./Register.js"
import Login from "./Login.js";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.js";
import ProtectedWrapper from "./ProtectedWrapper";
import Verify from "./Verify.js"
import VerifyOtp from "./otpverify.js"
// import Layout from "./Layout.js";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const App = () => {
    const [user, setUser] = useState("");
    const [loader, setLoader] = useState(true);
    let myLoginUser = JSON.parse(localStorage.getItem("user"));
    console.log("USER: ",user)
  
    useEffect(() => {
      if (myLoginUser) {
        setUser(myLoginUser._id);
        setLoader(false);
        console.log("inside effect", myLoginUser)
      } else {
        setUser("");
        setLoader(false);
      }
    }, [myLoginUser]);
  
    const signin = (newUser, callback) => {
      setUser(newUser);
      callback();
    };
  
    const signout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    let value = { user, signin, signout };
  
    if (loader)
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>LOADING...</h1>
        </div>
      );
    return (
        <AuthContext.Provider value = {value}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path = "/otp" element = {<VerifyOtp/>}/>
                    <Route path = "/verify" element = {<Verify/>}/>
                    <Route path="/register" element={<Register />} /> 
                      <Route path="/dashboard" element={<Dashboard/>}/> 
                      <Route path="/inventory" element={<Inventory/>}/>
                      <Route path="/invoice" element={<Invoice/>}/>
                      <Route path="/pendingTransactions" element={<PendingTransactions/>}/>
                      <Route path="/contactUs" element={<ContactUs/>}/>
                </Routes>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;