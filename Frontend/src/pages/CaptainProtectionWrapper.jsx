import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainProtectionWeapper = ({children})=>{

        const navigate= useNavigate();
        const {captain,setCaptain}=useContext(CaptainDataContext);
        const token = localStorage.getItem("token");

       useEffect(()=>{
        if(!token){
            navigate("/captain-login");
        }
       

       axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/profile`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
       }).then((response)=>{
        if(response.status==200){
            const data=response.data;
            setCaptain(data.captain);
         }
       }).catch((err)=>{
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
       })
    });

       return(
        <>
        {children}
        </>
       )
}

export default CaptainProtectionWeapper;