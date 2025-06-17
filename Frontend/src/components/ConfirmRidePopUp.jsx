import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({setConfirmRidePopUpPanel,setRidePopUpPanel,ride})=>{

    const naviagtor= useNavigate();
    const [otp,setOtp]=useState("");
    const[validOtp,setValidOtp]=useState("");

   async function submitHandler(e){
        e.preventDefault();
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captainToken')}`
            }
        })

        if (response.status === 200) {
            setConfirmRidePopUpPanel(false)
            setRidePopUpPanel(false)
            naviagtor('/captain-riding', { state: { ride: ride } })
        }
        }catch(err){
            setValidOtp(err.response.data.messages[0].msg);
        }
    }

    return(
        <div className="w-full  lg:w-1/2 lg:flex-row lg:mx-[300px] ">
        <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setConfirmRidePopUpPanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold">Confirm this Ride to Start</h3>

        <div className="flex items-center justify-between mt-5 border-2 border-yellow-400 p-3 -mb-3">
            <div className="flex items-center gap-4">
                <img className="h-12 w-12 rounded-full object-cover" src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg" alt="" />
                <h5 className="text-lg font-medium capitalize">{ride?.user.fullName.firstName}</h5>
            </div>
            <h5 className="text-lg font-semibold">2.3KM</h5>
        </div>

        <div className=" gap-2 flex justify-between items-center flex-col"> 
           <div className="w-full mt-3">
               <div className="flex items-center gap-5 p-3 border-b-2 ">
                   <i className="ri-map-pin-2-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">{ride?.pickup}</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3 border-b-2">
                   <i className="ri-map-pin-user-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">{ride?.destination}</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3">
                   <i className="text-lg ri-currency-line"></i>
                   <div>
                       <h3 className="texty-lg font-medium">&#8377;{ride?.fare}</h3>
                       <p className="text-sm text-grey-600">Cash</p>
                   </div>
               </div>
           </div>
          <div className="w-full mt-7">
            <form action="" onSubmit={submitHandler}>
                <input type="number" value={otp}  onChange={(e)=>setOtp(e.target.value)} className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-5 font-mono" placeholder="Enter OTP"/>
                <p className="text-lg font-medium h-50 w-full flex justify-center text-red-500 mb-5">{validOtp}</p>
            <button className="w-full text-lg flex justify-center bg-green-600 p-3 font-semibold text-white rounded-lg">Confirm</button>

<button onClick={()=>{setConfirmRidePopUpPanel(false),setRidePopUpPanel(false)}
   } className="w-full mt-2 text-lg bg-red-600 p-3 font-semibold text-white rounded-lg">Ignore</button>
            </form>
          </div>
        </div>
       </div>
    )
}
export default ConfirmRidePopUp;