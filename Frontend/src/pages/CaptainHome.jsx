import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDeaitails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

function CaptainHome() {

const {captain}=useContext(CaptainDataContext);
const {socket}=useContext(SocketContext);
const [ridePopUpPanel,setRidePopUpPanel]=useState(false);
const ridePopUpPanelRef=useRef(null);
const [confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
const confirmRidePopUpPanelRef=useRef(null);
const [ride,setRide]=useState(null);

useEffect(()=>{

socket.emit('join',{userType:"captain",userId:localStorage.getItem("_id")});

const updateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Updating location:", position.coords.latitude, position.coords.longitude);
                    socket.emit("update-location-captain", {
                    userId: localStorage.getItem("_id"),
                    location: {
                        ltd: position.coords.latitude, 
                        lng:position.coords.longitude,
                    },
                });
            },
            (error) => {
                console.error("Error fetching location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};
    const locationInterval = setInterval(updateLocation,10000);
    updateLocation();
    return () => clearInterval(locationInterval);
})

socket.on('new-ride',(data)=>{
    console.log("New ride:",data);
    setRidePopUpPanel(true);
    setRide(data);
})

async function confirmRide() { // Ensure ride is passed as an argument
    try {
        const captainData = localStorage.getItem("captain");
        if (!captainData) {
            console.error("No captain data found in localStorage");
            return;
        }
        
        const captain = JSON.parse(captainData);
        if (!captain?._id) {
            console.error("Invalid captain data");
            return;
        }

        if (!ride?._id) {
            console.error("Invalid ride data");
            return;
        }


        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/confirm`, {

            rideId: ride._id,
            captain: captain,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captainToken')}`
            }
        })
        console.log("Ride confirmed:", response.data);
    } catch (error) {
        console.error("Error confirming ride:", error.response?.data || error.message);
    }
}


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
        <div className="h-screen ">
         <div className="flex items-center justify-between fixed top-0 p-3 w-screen ">
            {/* <img className="w-16" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png" alt=""/> */}
            <Link to="/captain-login" className="h-10 w-10 bg-white flex items-center justify-end rounded-full lg:flex lg:ml-auto">
        <i className="text-lg font-medium ri-logout-box-r-line lg:w-[100px] "></i>
        </Link>
         </div>
         <div className="h-3/5 lg:w-1/2 lg:mx-[300px] lg:h-[300px]">
         {/* <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" /> */}
         <LiveTracking/>
         </div>

        <div className="h-2/5 p-4">
          <CaptainDeaitails />
        </div>

        <div ref={ridePopUpPanelRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white  pt-12">
            <RidePopUp ride={ride} confirmRide={confirmRide}
            setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        <div ref={confirmRidePopUpPanelRef} className="fixed z-10 bottom-0 translate-y-full h-screen w-full px-3 py-6 bg-white  pt-12">
            <ConfirmRidePopUp ride={ride} 
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div>

    </div>
    )
}

export default CaptainHome;