import React, { useRef, useState } from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmRide from "../components/ConfirmRide";

const Home = () => {
    const [pickup,setPickup] = useState("");
    const [destination,setDestinaton] = useState("");
    const [panelOpen,setPanelOpen] = useState(false);
    const panelRef=useRef(null);
    const panelCloseRef=useRef(null);
    const [vehicalPanel,setVehicalPanel]=useState(false);
    const [confirmeRidePanel,setConfirmeRidePanel]=useState(false);
    const vehicalPanelRef=useGSAP(null);
    const confirmeRidePanelRef=useGSAP(null);

    const submitHandler =(e)=>{
        e.preventDefault();
    }

    useGSAP(()=>{
        if(panelOpen){
            gsap.to(panelRef.current,{
                height:"70%",
                padding:24
            })
            gsap.to(panelCloseRef.current,{
                opacity:1
            })
        }else{
            gsap.to(panelRef.current,{
                height:0
            })
            gsap.to(panelCloseRef.current,{
                opacity:0
            })
        }
    },[panelOpen])

    useGSAP(function(){
        if(vehicalPanel){
            gsap.to(vehicalPanelRef.current,{
                transform:"translateY(0)"
            })
        }else{
            gsap.to(vehicalPanelRef.current,{
                transform:"translateY(100%)"
            })
        }
        },[vehicalPanel])

        useGSAP(function(){
            if(confirmeRidePanel){
                gsap.to(confirmeRidePanelRef.current,{
                    transform:"translateY(0)"
                })
            }else{
                gsap.to(confirmeRidePanelRef.current,{
                    transform:"translateY(100%)"
                })
            }
            },[confirmeRidePanel])
    return (
        <div className="h-screen relative overflow-hidden">
           
    `       <div className="absolute top-0 h-screen w-screen ">
                 <img className="w-16 absolute left-5 top-5" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png" alt="" />
                 <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
            </div>
            <div className="absolute  top-0 w-full flex flex-col justify-end h-screen  ">
                <div className="h-[30%] bg-white p-5">
                    <h5 ref={panelCloseRef} className="absolute opacity-0 right-6 top-6 text-2xl " onClick={()=>{
                        setPanelOpen(false);
                    }}
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold mb-3">Find a trip</h4>
                    <form onSubmit={submitHandler}>
                        <input 
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3"
                         type="text" placeholder="Add a pickup location" 
                        onClick={()=>{
                            setPanelOpen(true);
                        }}
                        onChange={(e)=> setPickup(e.target.value)}
                        value={pickup}
                        />
                        <input 
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3" 
                        type="text"
                        placeholder="Enter your destination"
                        onClick={()=>{
                         setPanelOpen(true);
                        }}
                        value={destination}
                        onChange={(e)=>setDestinaton(e.target.value)} 
                        />
                    </form>
                </div>

                <div ref={panelRef} className=" h-[] bg-white ">
                        {<LocationSearchPanel setPanelOpen={setPanelOpen} setVehicalPanel={setVehicalPanel}/>}
                </div>
            </div>

            <div ref={vehicalPanelRef} className="fixed z-10 bottom-0 w-full px-3 py-10 bg-white translate-y-full pt-12">
               <VehicalPanel setVehicalPanel={setVehicalPanel} setConfirmeRidePanel={setConfirmeRidePanel}/>
            </div>

            <div ref={confirmeRidePanelRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12">
               <ConfirmRide setConfirmeRidePanel={setConfirmeRidePanel}/>
            </div>
        </div>
    
    )
}

export default Home;