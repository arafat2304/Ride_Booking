import React from "react";

const LocationSearchPanel = ()=>{
  const location = ["15B near aabid house malek vada","16C near nadim house malek vada","15A near aakib house malek vada","13C near rasid mama house"]
    return(
        <div>
          <div className="p-3 flex justify-center items-center gap-4 my-2 border-2 border-grey-100 active:border-black roudede-xl">
            <h2 className="bg-[#eee] w-12 h-8 flex justify-center items-center  text-xl  rounded-full"><i className=" ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">near Huseni Chok,  vadad road dakor pase </h4>
          </div>

          <div className="p-3 flex justify-center items-center gap-4 my-2 border-2 border-grey-100 active:border-black roudede-xl">
            <h2 className="bg-[#eee] w-12 h-8 flex justify-center items-center  text-xl  rounded-full"><i className=" ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">near Huseni Chok,  vadad road dakor pase </h4>
          </div>

          <div className="p-3 flex justify-center items-center gap-4 my-2 border-2 border-grey-100 active:border-black roudede-xl">
            <h2 className="bg-[#eee] w-12 h-8 flex justify-center items-center  text-xl  rounded-full"><i className=" ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">near Huseni Chok,  vadad road dakor pase</h4>
          </div>

          <div className="p-3 flex justify-center items-center gap-4 my-2 border-2 border-grey-100 active:border-black roudede-xl">
            <h2 className="bg-[#eee] w-12 h-8 flex justify-center items-center  text-xl  rounded-full"><i className=" ri-map-pin-fill"></i></h2>
            <h4 className="font-medium">near Huseni Chok,  vadad road dakor pase  </h4>
          </div>
        </div>
    )
}

export default LocationSearchPanel;