import { Link, useNavigate } from 'react-router-dom';
import React, { useState,useContext } from 'react';
import axios from 'axios';
import {UserDataContext} from '../context/userContext';
const UserSignup = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState(""); 
    let [firtName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userData, setUserData] = useState({});

    const navigate=useNavigate();

    const {user, setUser} = useContext(UserDataContext);

    const handleSubmit = async (e) => {
          e.preventDefault();
          const newUser=({
            fullName:{
              firstName: firtName,
            lastName: lastName
            },
            email: email,
            password: password,
          }); 
          let response = await axios.post("http://localhost:4000/users/register", newUser);
          console.log(response)

          if(response.status ===201){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem("token",data.token);
            navigate('/home');
          }
         setEmail("");
         setPassword("");
         setFirstName("");
         setLastName("");
      }
        return (
          <div className="p-7 flex justify-between flex-col h-screen">
            <div>
                  <img className="w-16 mb-10" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"/>
                  <form className="" onSubmit={handleSubmit}>
    
                  <h3 className="text-base font-medium mb-2">What's your Name</h3>
                  <div className="flex gap-4 mb-6">
                  <input
                    className="bg-[#eeeeee] px-4 py-2 rounded border w-1/2 text-base placeholder:text-sm"
                    type="text" 
                    placeholder="First Name" 
                    value={firtName}
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
    
                    <h3 className="text-base font-medium mb-2">What's your email</h3>
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
            
                    <button className="bg-[#111] text-white font-semibold px-4 py-2 rounded w-full text-base placeholder:text-sm mb-4">Create Accout</button>
                  <p className="text-center">Already have Account? <Link to="/login" className="text-blue-600">Login here</Link></p>
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
    
  
  
  export default UserSignup;