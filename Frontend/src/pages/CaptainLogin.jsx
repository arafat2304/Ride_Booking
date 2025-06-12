import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import UserContext from "../context/UserContext";

export default function CaptainLogin() {

  

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [error, setError] = React.useState("");
  const navigate=useNavigate();
  
  const value =useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captain=({
      email,
      password,
    });
   try{

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/login`,captain);

    
    if(response.status==200){
      const data = response.data;
      console.log(data)
      localStorage.setItem("captain", JSON.stringify(data.captain));
      localStorage.setItem("captainToken",data.token);
      localStorage.setItem("_id",data.captain._id);
      console.log(localStorage.getItem("token"));
      navigate("/captain-home")
    }

   }catch(err){
    if(err.response.status === 404){
      setError(err.response.data.errors);
   }
  }
    setEmail("");
    setPassword("");

  }
  return(
    <div className="p-7 flex justify-between flex-col h-screen lg:h-screen lg:w-1/2 lg:mx-[300px]">
      <div className="mt-12">
        <p className="text-xl font-semibold mb-5">Welcome Back, Captain!</p>
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

              <p className="text-lg font-medium h-50 w-full flex justify-center text-red-500 mb-5">{error}</p>
      
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