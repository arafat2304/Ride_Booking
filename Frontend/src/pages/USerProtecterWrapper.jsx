import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserProtecterWrapper = ({children})=>{
    const navigate = useNavigate()
    const token = localStorage.getItem("userToken");

    const {user,setUser}=useContext(UserDataContext);
   
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    

    axios.get("http://localhost:4000/users/getProfile",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status==201){
            const data = response.data;
            setUser(data.user);
            navigate("/Home")
        }
    }).catch((err)=>{
        console.log(err);
        navigate("/login");
    })
})

    return(
        <>
        {children}
        </>
    )
}

export default UserProtecterWrapper;