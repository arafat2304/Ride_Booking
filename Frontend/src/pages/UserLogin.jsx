import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

export default function UserLogin() {

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [userData, setUserData] = React.useState({});
  let [error, setError] = React.useState("");


  const navigate = useNavigate();
  const {user,setUser}=useContext(UserDataContext);

  const handleSubmit =async (e) => {
    e.preventDefault();

    userData=({
      email: email,
      password: password, 
    })


   try{
    const response = await axios.post("http://localhost:4000/users/login",userData);
    console.log(response)

    if(response.status === 200){
      const data = response.data
      setUser(data.user);
      console.log(data)
      localStorage.setItem("userToken",data.token);
      localStorage.setItem("user",data.user._id);
      navigate("/home")
    }
   }catch(err){
    if(err.response.status === 404){
      console.log(err.response.data.errors)
      setError(err.response.data.errors)
    }
    
  }

    
    setEmail("");
    setPassword("");

  }

  return(
    <div className="p-7 flex justify-between flex-col h-screen lg:h-screen lg:w-1/2 lg:mx-[300px]">
      <div className="mt-12">
        <p className="text-xl font-semibold mb-5">One step is away for Destination..</p>
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
      <p className="text-center">New here? <Link to="/signup" className="text-blue-600">Crate new account</Link></p>
      </form>
      </div>
      
      <div>
        <Link 
        to="/captain-login"
        className="bg-[#10b461] flex justify-center items-center text-white font-semibold px-4 py-2 rounded w-full text-lg placeholder:text-base mb-7">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}