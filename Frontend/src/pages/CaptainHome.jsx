import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDeaitails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";


function CaptainHome() {
const [ridePopUpPanel,setRidePopUpPanel]=useState(true);
const ridePopUpPanelRef=useRef(null);
const [confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
const confirmRidePopUpPanelRef=useRef(null);

useGSAP(function(){
    if(ridePopUpPanel){
        gsap.to(ridePopUpPanelRef.current,{
            transform:"translateY(0)"
        })
    }else{
        gsap.to(ridePopUpPanelRef.current,{
            transform:"translateY(100%)"
        })
    }
    },[ridePopUpPanel])

    useGSAP(function(){
        if(confirmRidePopUpPanel){
            gsap.to(confirmRidePopUpPanelRef.current,{
                transform:"translateY(0)"
            })
        }else{
            gsap.to(confirmRidePopUpPanelRef.current,{
                transform:"translateY(100%)"
            })
        }
        },[confirmRidePopUpPanel])

    return ( 
        <div className="h-screen">
         <div className="flex items-center justify-between fixed top-0 p-3 w-screen">
            <img className="w-16" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png" alt=""/>
            <Link to="/home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
         </div>
         <div className="h-3/5">
         <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
         </div>

        <div className="h-2/5 p-4">
          <CaptainDeaitails/>
        </div>

        <div ref={ridePopUpPanelRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white  pt-12">
            <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        <div ref={confirmRidePopUpPanelRef} className="fixed z-10 bottom-0 translate-y-full h-screen w-full px-3 py-6 bg-white  pt-12">
            <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div>

    </div>
    )
}

export default CaptainHome;