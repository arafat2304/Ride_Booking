import React from "react";

const LookingForDriver = ({setVehicalFound,pickup,destination,vehicalType,fare})=>{
    return(
        <div className="w-full lg:w-1/3 lg:mx-[450px] lg:h-[520px]">
        <h5 className="absolute top-0 w-[93%] text-center" onClick={()=>setVehicalFound(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold">Looking For Driver</h3>

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
           
        </div>
       </div>
    )
}

export default LookingForDriver;