import React, { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState ,useContext} from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function CaptainSignup() {
  const navigate=useNavigate();

   let [email, setEmail] = useState("");
   let [password, setPassword] = useState(""); 
   let [firstName, setFirstName] = useState("");
   let [lastName, setLastName] = useState("");

   let [color,setVehicalColor]=useState("");
   let [plate,setVehicalPlate]=useState("");
   let [capicity,setVehicalCapicity]=useState("");
   let [vehicalType,setVehicalType]=useState("");


   const {captain,setCaptain}=useContext(CaptainDataContext);
    
   const handleSubmit = async (e) => {
      e.preventDefault();
      const captainData=({
      fullName:{
            firstName: firstName,
            lastName: lastName
           },
      email: email,
      password: password,
      vehical:{
        capicity,
        color,
        plate,
        vehicalType
      }
  }); 

  const response = await axios.post("http://localhost:4000/captains/register",captainData);
 console.log(response.data)
  if(response.status==201){
    const data = response.data;
    setCaptain(data.captain);
    localStorage.setItem("token",data.token);
    localStorage.setItem("_id",data.captain._id);
    localStorage.setItem("captain", JSON.stringify(data.captain));
    navigate("/captain-home");
  }
 
  setEmail("");
  setPassword("");
  setFirstName("");
  setLastName("");
  }
    return (
      <div className="py-5 px-5 flex justify-between flex-col h-screen">
                  <div>
                        <img className="w-16 mb-10" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"/>
                        <form className="" onSubmit={handleSubmit}>
          
                        <h3 className="text-base font-medium mb-2">What's our captain Name</h3>
                        <div className="flex gap-4 mb-6">
                        <input
                          className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-sm"
                          type="text" 
                          placeholder="First Name" 
                          value={firstName}
                          onChange={(e)=> setFirstName(e.target.value)}
                          required />
          
                        <input
                          className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-sm"
                          type="text" 
                          placeholder="Last Name" 
                          value={lastName}
                          onChange={(e)=> setLastName(e.target.value)}
                          required />
                        </div>
          
                          <h3 className="text-base font-medium mb-2">What's captain email</h3>
                          <input
                          className="bg-[#eeeeee] px-4 py-2 rounded border w-full text-base placeholder:text-sm mb-6"
                          type="email" 
                          placeholder="Enter Email" 
                          value={email}
                          onChange={(e)=> setEmail(e.target.value)}
                          required />
                  
                          <h3 className="text-base font-medium mb-2">Enter Password</h3>
                          <input 
                          className="bg-[#eeeeee] px-4 py-2 rounded border w-full text-base placeholder:text-sm mb-6"
                          type="password" 
                          placeholder="Enter password" 
                          value={password}
                          onChange={(e)=> setPassword(e.target.value)}
                          required/>
                          
                          <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
                          <div className="flex flex-wrap gap-4 mb-7">
                          <input 
                          className=" w-[calc(50%-8px)] bg-[#eeeeee] px-4 py-2 rounded border  text-base placeholder:text-sm mb-6"
                          type="text" 
                          placeholder="Enter color" 
                          value={color}
                          onChange={(e)=> setVehicalColor(e.target.value)}
                          required/>

                          <input 
                          className="w-[calc(50%-8px)] bg-[#eeeeee] px-4 py-2 rounded border  text-base placeholder:text-sm mb-6"
                          type="text" 
                          placeholder="Enter Number Plate" 
                          value={plate}
                          onChange={(e)=> setVehicalPlate(e.target.value)}
                          required/>

                          <input 
                          className="w-[calc(50%-8px)] bg-[#eeeeee] px-4 py-2 rounded border text-base placeholder:text-sm mb-6"
                          type="number" 
                          placeholder="Enter Capicity" 
                          value={capicity}
                          onChange={(e)=> setVehicalCapicity(e.target.value)}
                          required/>

                          <select
                          required 
                          className="w-[calc(50%-8px)] bg-[#eeeeee] px-4 py-2 rounded border  text-base placeholder:text-sm mb-6"
                          value={vehicalType}
                          onChange={(e)=> setVehicalType(e.target.value)}
                          >
                          <option value="" disabled>Select Vehicle type</option>
                          <option value="car">car</option>
                          <option value="auto">auto</option>
                          <option value="moto">moto</option>
                          </select>
                          </div>
                          <button className="bg-[#111] text-white font-semibold px-4 py-2 rounded w-full text-base placeholder:text-sm mb-4">Create captain account</button>
                        <p className="text-center">Already have Account? <Link to="/captain-login" className="text-blue-600">Login here</Link></p>
                        </form>
                        </div>
                        
                        <div>
                          <p className='text-[10px] leading-tight'>
                            By procceding, you consent to get calls, whatsapp or SMS messages, including by automated means, from uber and its affiliates to the number provided
                          </p>
                        </div>
                </div>
  )
}