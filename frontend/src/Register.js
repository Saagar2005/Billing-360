import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  //va confirmpassword = ""
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    gstno: "",
    shopname: "",
    shopaddress: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = () => {
    // Check if passwords match
    if (form.password !== form.confirmpassword) {
      alert("Password and Confirm Password do not match");
      return; // Exit function if passwords don't match
    }
  
    fetch("http://localhost:5050/api/register/reg", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert("Successfully Registered, Now Login with your details");
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center" >
      <div id="sign-up">
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img 
              class = "fit-picture"
            src="logo1.png" alt = "Billing360 Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex gap-4" >
                <input
                  name="firstname"
                  type="text"
                  required
                  className="input-box"
                  placeholder="First Name"
                  value={form.firstname}
                  onChange={handleInputChange}
                />
                
                <input
                  name="lastname"
                  type="text"
                  required
                  className="input-box"
                  placeholder="Last Name"
                  value={form.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-box"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
                <br></br>
                <br></br>
              <input
                  name="shopname"
                  type="text"
                  required
                  className="input-box"
                  placeholder="Shop Name"
                  value={form.shopname}
                  onChange={handleInputChange}
                /> 
              <input
                  name="shopaddress"
                  type="text"
                  required
                  className="input-box"
                  placeholder="Shop Address"
                  value={form.shopaddress}
                  onChange={handleInputChange}
                />  
                <br></br>
                <br></br>
              <input
                  name="gstno"
                  type="text"
                  autoComplete="off"
                  required
                  className="input-box"
                  placeholder="Enter GST No."
                  value={form.gstno}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div>   
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="input-box"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="off"
                  required
                  className="input-box"
                  placeholder="Confirm Password"
                  value={form.confirmpassword}
                  onChange={handleInputChange}
                />
              </div>
            <br></br>
            <div className="flex items-center justify-between" class="center">
              <div className="flex items-center" id="rememberme">
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                    I Agree to the Terms & Conditons
                </label>
                <input type="checkbox" id="rememberMe" name="rememberMe"></input>
              </div>

              
            </div>  
           <br></br>
            <div class="center">
              <button 
                type="submit" 
                id="btn1"
                onClick={registerUser}
                
              >
                Sign up
              </button>
              <br></br>
              <p className="mt-2 text-center text-sm text-gray-600" id="rememberme">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already Have an Account? <Link to="/">Sign in</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <footer id="footer">
          <span>Billing 360 &copy; 2024 Copyright All Rights Reserved.</span>
        </footer>
      </div>
      </div>
    </>
  );
}

export default Register;
