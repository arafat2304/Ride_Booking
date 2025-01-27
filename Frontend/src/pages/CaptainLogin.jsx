import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import UserContext from "../context/userContext";

export default function CaptainLogin() {

  const navigate=useNavigate();

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  const {captain,setCaptain}=useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captain=({
      email,
      password,
    });
console.log(captain)
    const response = await axios.post("http://localhost:4000/captains/login",captain);

    console.log(response)
    if(response.status==200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token",data.token)
      navigate("/captain-home")
    }
    
    setEmail("");
    setPassword("");

  }
  return(
    <div className="p-7 flex justify-between flex-col h-screen">
      <div>
            <img className="w-16 mb-10" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"/>
            <form className="" onSubmit={handleSubmit}>
              <h3 className="text-lg font-medium mb-2">What's your email</h3>
              <input 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-full text-lg placeholder:text-base mb-7"
              type="email" 
              placeholder="Enter Email" 
              required />
      
              <h3 className="text-lg font-medium mb-2">Enter Password</h3>
              <input 
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] px-4 py-2 rounded border w-full text-lg placeholder:text-base mb-7"
              type="password" 
              placeholder="Enter password" 
              required/>
      
              <button className="bg-[#111] text-white font-semibold px-4 py-2 rounded w-full text-lg placeholder:text-base mb-4">Login</button>
            <p className="text-center">Join a fleet? <Link to="/captain-signup" className="text-blue-600">Register as captain</Link></p>
            </form>
            </div>
            
            <div>
              <Link 
              to="/signup"
              className="bg-[#d5622d] flex justify-center items-center text-white font-semibold px-4 py-2 rounded w-full text-lg placeholder:text-base mb-7">
                Sign in as User
              </Link>
            </div>
    </div>
  )
}