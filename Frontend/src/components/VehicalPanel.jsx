import React from "react";

const VehicalPanel = ({setVehicalPanel,setConfirmeRidePanel,fare,setVehicalType})=>{
    return(
        <div className="lg:w-1/2 lg:mx-[300px] lg:h-[300px]">
             <h5 className="absolute p-1 top-0 w-[93%] text-center" onClick={()=>setVehicalPanel(false)}><i className="text-3xl ri-arrow-down-wide-line"></i></h5>
                <div onClick={()=>{
                    setConfirmeRidePanel(true);
                    setVehicalType("car");
                    }} className="flex  mb-2 border-2 active:border-black rounded-xl items-center justify-between bg-white w-full p-3">
                    <img className="h-12" src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png" alt="" />
                    <div className=" w-1/2">
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                        <h5 className="font-semibold text-sm">{fare.carTime} Minit Away</h5>
                        <p className="font-normal text-sm text-gray-600">Affrodable, companct rides</p>
                    </div>
                    <h1 className="text-lg font-bold">&#8377;{fare.car}</h1>
                </div>

                <div onClick={()=>{
                    setConfirmeRidePanel(true);
                    setVehicalType("motorcycle");
                    }} className="flex mb-2 border-2  active:border-black rounded-xl items-center justify-between bg-white w-full p-3">
                    <img className="h-12" src="https://tse4.mm.bing.net/th?id=OIP.znY96OhfmQ9RecEw45FS_AHaE7&pid=Api&P=0&h=180" alt="" />
                    <div className=" w-1/2 ">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-fill"></i>1</span></h4>
                        <h5 className="font-semibold text-sm">{fare.motorcycleTime} Minit Away</h5>
                        <p className="font-normal text-sm text-gray-600">Affrodable, Motorcycle  rides</p>
                    </div>
                    <h1 className="text-lg font-bold">&#8377;{fare.motorcycle}</h1>
                </div>

                <div onClick={()=>{
                    setConfirmeRidePanel(true);
                    setVehicalType("auto");
                    }} className="flex mb-2 border-2  active:border-black rounded-xl items-center justify-between bg-white w-full p-3">
                    <img className="h-12" src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                    <div className=" w-1/2 ">
                        <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
                        <h5 className="font-semibold text-sm">{fare.autoTime} Minit Away</h5>
                        <p className="font-normal text-sm text-gray-600">Affrodable, Auto rides</p>
                    </div>
                    <h1 className="text-lg font-bold">&#8377;{fare.auto}</h1>
                </div>
        </div>
    )
}

export default VehicalPanel;