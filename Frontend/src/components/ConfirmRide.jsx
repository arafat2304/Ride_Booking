import React from "react";

const ConfirmRide = ({setConfirmeRidePanel,setVehicalFound,createRide,pickup,destination,fare,vehicalType})=>{

    
    return(
        <div className="w-full">
         <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setConfirmeRidePanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
         <h3 className="text-2xl font-semibold">Confirm Your Ride</h3>

         <div className=" gap-2 flex justify-between items-center flex-col"> 
            <img className="h-25" src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"></img>
            <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-3 border-b-2 ">
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div>
                        <h3 className="texty-lg font-medium">562/11-A</h3>
                        <p className="text-sm text-grey-600">{pickup}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className="ri-map-pin-user-fill text-lg"></i>
                    <div>
                        <h3 className="texty-lg font-medium">562/11-A</h3>
                        <p className="text-sm text-grey-600">{destination}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3">
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className="texty-lg font-medium">&#8377;{fare[vehicalType]}</h3>
                        <p className="text-sm text-grey-600">Cash</p>
                    </div>
                </div>
            </div>
            <button onClick={()=>{
                setVehicalFound(true);
                setConfirmeRidePanel(false);
                createRide();
                }} className="w-full mt-5 mb-2 bg-green-600 p-2 font-semibold text-white rounded-lg">Confirm Ride</button>
         </div>
        </div>
    )
}

export default ConfirmRide;