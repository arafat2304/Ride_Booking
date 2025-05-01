import React from "react";

const WaitingForDriver = ({setWaitingForDriver,ride}) => {
    return (
        <div className="w-full lg:w-1/2 lg:mx-[280px] lg:h-[350px]">
        <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setWaitingForDriver(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>

        <div className="flex items-center justify-between">
        <img className="h-20" src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"></img>
        <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain.fullName.firstName+" "+ride?.captain.fullName.lastName}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehical.plate}</h4>
            <p className="text-sm text-grey-600">Maruti Suzuki Alto</p>
            <h1 className="text-lg font-semibold">{ride?.otp}</h1>
        </div>
        </div>
        <div className=" gap-2 flex justify-between items-center flex-col"> 
           <div className="w-full mt-5">
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
           
        </div>
       </div>
    );
};

export default WaitingForDriver;