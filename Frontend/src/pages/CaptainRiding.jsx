import React from "react";
import { Link } from "react-router-dom";

const CaptainRiding = () =>{
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

         <div className="h-1/4 p-6 pt-2 flex justify-between bg-yellow-400  items-center relative">
         <h5 className="absolute p-1 top-0 w-[90%] text-center" onClick={()=>setRidePopUpPanel(false)}><i className="text-3xl ri-arrow-up-wide-line"></i></h5>
            <h4 className="font-semibold text-lg">4 KM Away</h4>
            <button className=" flex items-center justify-center h-14 w-50 p-5 px-10 bg-green-600 font-semibold text-white rounded-lg">Complete Ride</button>
         </div>

       
    </div>
    )
}

export default CaptainRiding;