import React from "react";

const RidePopUp =({setRidePopUpPanel,setConfirmRidePopUpPanel})=>{
    return(
        <div className="w-full">
        <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setRidePopUpPanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold">New Ride Available</h3>

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
          <div className="flex justify-between w-full">
          <button onClick={()=>{setConfirmRidePopUpPanel(true)}
               } className="w-30 mt-1 bg-green-600 p-4 m-2 px-10 font-semibold text-white rounded-lg">Accept</button>

            <button onClick={()=>{setRidePopUpPanel(false)}
               } className="w-30 mt-1 bg-gray-500 p-4 px-10 m-2 font-semibold text-white rounded-lg">Ignore</button>
          </div>
        </div>  
       </div>
    )
}

export default RidePopUp