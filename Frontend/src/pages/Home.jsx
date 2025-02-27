import React, { useRef, useState } from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";

const Home = () => {
    const [pickup,setPickup] = useState("");
    const [destination,setDestination] = useState("");
    const [panelOpen,setPanelOpen] = useState(false);
    const panelRef=useRef(null);
    const panelCloseRef=useRef(null);
    const [vehicalPanel,setVehicalPanel]=useState(false);
    const [confirmeRidePanel,setConfirmeRidePanel]=useState(false);
    const vehicalPanelRef=useGSAP(null);
    const confirmeRidePanelRef=useGSAP(null);
    const vehicalFoundRef=useGSAP(null);
    const [vehicalFound,setVehicalFound]=useState(false);
    const waitingForDriverRef=useGSAP(null);
    const [waitingForDriver,setWaitinForDriver]=useState(false);
    const [pickupSuggestions,setPickupSuggestions]=useState([]);    
    const [destinationSuggestions,setDestinationSuggestions]=useState([]);
    const [ activeField, setActiveField ] = useState(null)

    const handlePickupChange = async (e)=>{
        setPickup(e.target.value);
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {params:{input:e.target.value},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });

            setPickupSuggestions(response.data);
        }catch(err){

        }
    }

    const handleDestinationChange = async (e)=>{
        setDestination(e.target.value);
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {params:{input:e.target.value},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            setDestinationSuggestions(response.data);
        }catch(err){

        }
    }



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

            useGSAP(function(){
                if(vehicalFound){
                    gsap.to(vehicalFoundRef.current,{
                        transform:"translateY(0)"
                    })
                }else{
                    gsap.to(vehicalFoundRef.current,{
                        transform:"translateY(100%)"
                    })
                }
                },[vehicalFound])

                useGSAP(function(){
                    if(waitingForDriver){
                        gsap.to(waitingForDriverRef.current,{
                            transform:"translateY(0)"
                        })
                    }else{
                        gsap.to(waitingForDriverRef.current,{
                            transform:"translateY(100%)"
                        })
                    }
                    },[waitingForDriver])
        
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
                    <form onSubmit={()=>submitHandler(e)}>
                        <input 
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3"
                         type="text" placeholder="Add a pickup location" 
                        onClick={()=>{
                            setPanelOpen(true);
                            setActiveField("pickup");
                        }}
                        onChange={handlePickupChange}
                        value={pickup}
                        />
                        <input 
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3" 
                        type="text"
                        placeholder="Enter your destination"
                        onClick={()=>{
                         setPanelOpen(true);
                         setActiveField(handleDestinationChange);
                        }}
                        value={destination}
                        onChange={(e)=>setDestination(e.target.value)} 
                        />
                    </form>
                </div>

                <div ref={panelRef} className=" h-[] bg-white ">
                        <LocationSearchPanel 
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen} 
                        setVehicalPanel={setVehicalPanel}
                        setPickup={setPickup}
                        setDestination={ setDestination}
                        activeField={activeField} />
                </div>
            </div>

            <div ref={vehicalPanelRef} className="fixed z-10 bottom-0 w-full px-3 py-10 bg-white translate-y-full pt-12">
               <VehicalPanel setVehicalPanel={setVehicalPanel} setConfirmeRidePanel={setConfirmeRidePanel}/>
            </div>

            <div ref={confirmeRidePanelRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12">
               <ConfirmRide setConfirmeRidePanel={setConfirmeRidePanel} setVehicalFound={setVehicalFound}/>
            </div>

            <div ref={vehicalFoundRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12">
             <LookingForDriver setVehicalFound={setVehicalFound}/>
            </div>

            <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white  pt-12">
             <WaitingForDriver setWaitinForDriver={setWaitinForDriver}/>
            </div>
        </div>
    
    )
}

export default Home;