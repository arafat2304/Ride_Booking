import React from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = ({setConfirmRidePopUpPanel,setRidePopUpPanel})=>{
    return(
        <div className="w-full">
        <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setConfirmRidePopUpPanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold">Confirm this Ride to Start</h3>

        <div className="flex items-center justify-between mt-5 bg-yellow-400 p-3 -mb-3">
            <div className="flex items-center gap-4">
                <img className="h-12 w-12 rounded-full object-cover" src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg" alt="" />
                <h5 className="text-lg font-medium">Arafat Malek</h5>
            </div>
            <h5 className="text-lg font-semibold">2.3KM</h5>
        </div>

        <div className=" gap-2 flex justify-between items-center flex-col"> 
           <div className="w-full mt-3">
               <div className="flex items-center gap-5 p-3 border-b-2 ">
                   <i className="ri-map-pin-2-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">kankariya talav, Ahemdabad</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3 border-b-2">
                   <i className="ri-map-pin-user-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">kankariya talav, Ahemdabad</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3">
                   <i className="text-lg ri-currency-line"></i>
                   <div>
                       <h3 className="texty-lg font-medium">&#8377;193.20</h3>
                       <p className="text-sm text-grey-600">Cash</p>
                   </div>
               </div>
           </div>
          <div className="w-full mt-7">
            <form action="">
                <input type="number" className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-5 font-mono" placeholder="Enter OTP"/>
            <Link to={"/captain-riding"} className="w-full  flex justify-center bg-green-600 p-3 font-semibold text-white rounded-lg">Confirm</Link>

<button onClick={()=>{setConfirmRidePopUpPanel(false),setRidePopUpPanel(false)}
   } className="w-full mt-2 bg-red-600 p-3 font-semibold text-white rounded-lg">Ignore</button>
            </form>
          </div>
        </div>
       </div>
    )
}
export default ConfirmRidePopUp;