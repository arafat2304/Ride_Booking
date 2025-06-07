import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = ()=>{

    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    console.log(token)
        
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status==200){
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        }).catch((err)=>{
            console.log(err);

        });
    })

        return null;
}

export default CaptainLogout;