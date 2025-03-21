import React, { useState } from "react";
import { Link , useLocation } from "react-router-dom";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import FinsihRidePopUp from "../components/FinishRidePopUp";

const CaptainRiding = () =>{

    const [finsihRidePanel,setFinishRidePanel]=useState(false);
    const finsihRidePanelRef=useGSAP(null);
    const location = useLocation();
    const rideData = location.state?.ride;

    useGSAP(function(){
        if(finsihRidePanel){
            gsap.to(finsihRidePanelRef.current,{
                transform:"translateY(0)"
            })
        }else{
            gsap.to(finsihRidePanelRef.current,{
                transform:"translateY(100%)"
            })
        }
        },[finsihRidePanel])

    return(
        <div className="h-screen">
         <div className="flex items-center justify-between fixed top-0 p-3 w-screen">
            <img className="w-16" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png" alt=""/>
            <Link to="/home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
         </div>

         <div className="h-4/5">
         <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
         </div>

         <div className="h-1/4 p-6 pt-2 flex justify-between bg-yellow-400  items-center relative" onClick={()=>setFinishRidePanel(true)}>
         <h5 className="absolute p-1 top-0 w-[90%] text-center" onClick={()=>setFinishRidePanel(true)}><i className="text-3xl ri-arrow-up-wide-line"></i></h5>
            <h4 className="font-semibold text-lg">4 KM Away</h4>
            <button className=" flex items-center justify-center h-14 w-50 p-5 px-10 bg-green-600 font-semibold text-white rounded-lg">Complete Ride</button>
         </div>

         <div ref={finsihRidePanelRef} className="fixed z-10 bottom-0 w-full px-3 py-10 bg-white translate-y-full pt-12">
               <FinsihRidePopUp rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
            </div>

    </div>
    )
}

export default CaptainRiding;