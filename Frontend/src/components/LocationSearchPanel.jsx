import React from "react";

const LocationSearchPanel = ({setPanelOpen,setVehicalPanel})=>{
  const locations = ["15B near aabid house malek vada","16C near nadim house malek vada","15A near aakib house malek vada","13C near rasid mama house malek wada"];
  
    return(
        <div className="py-5">
          {
            locations.map((e,idx)=>{
              return(
                <div onClick={()=>{
                  setVehicalPanel(true)
                  setPanelOpen(false) 
                  }} key={idx} className="flex gap-4 border-2 p-3 border-grey-50 active:border-black rounded-xl items-center my-2 justify-center">
                  <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full"><i class="ri-map-pin-2-fill"></i></h2>
                  <h4 className="font-medium">{e}</h4>
                </div>
              )
            })
          }
        </div>
    )
}

export default LocationSearchPanel;