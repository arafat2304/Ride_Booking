import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const FinsihRidePopUp = ({setFinishRidePanel,rideData}) =>{

    const navigator = useNavigate();
    console.log(import.meta.env.VITE_BACKEND_URL);

    const endRide = async () =>{

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/end-ride`,{
                rideId:rideData._id
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('captainToken')}`
            }
        })
        console.log(response);
        if(response.status===200){
            setFinishRidePanel(false);
            navigator("/captain-home");

        }
    }
    return(
        <div className="w-full  lg:w-1/2  lg:w-1/2 lg:flex-row lg:mx-[300px]">
        <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setFinishRidePanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold">Finish this Ride!</h3>

        <div className="flex items-center justify-between mt-5 border-2 border-yellow-400 p-3 -mb-3">
            <div className="flex items-center gap-4">
                <img className="h-12 w-12 rounded-full object-cover" src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg" alt="" />
                <h5 className="text-lg font-medium">{rideData?.user.fullName.firstName}</h5>
            </div>
            <h5 className="text-lg font-semibold">{rideData.distance}</h5>
        </div>

        <div className=" gap-2 flex justify-between items-center flex-col"> 
           <div className="w-full mt-3">
               <div className="flex items-center gap-5 p-3 border-b-2 ">
                   <i className="ri-map-pin-2-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">{rideData?.pickup}</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3 border-b-2">
                   <i className="ri-map-pin-user-fill text-lg"></i>
                   <div>
                       <h3 className="texty-lg font-medium">562/11-A</h3>
                       <p className="text-sm text-grey-600">{rideData?.destination}</p>
                   </div>
               </div>
               <div className="flex items-center gap-5 p-3">
                   <i className="text-lg ri-currency-line"></i>
                   <div>
                       <h3 className="texty-lg font-medium">&#8377;{rideData?.fare}</h3>
                       <p className="text-sm text-grey-600">Cash</p>
                   </div>
               </div>
           </div>
          <div className="w-full mt-7">
            <button onClick={endRide} className="w-full  flex justify-center bg-green-600 p-3 font-semibold text-white rounded-lg">Finish Ride</button>
          </div>
        </div>
       </div>
    )
}

export default FinsihRidePopUp;