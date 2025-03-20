import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from "../context/UserContext";

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
    const [ activeField, setActiveField ] = useState(null);
    const [fare,setFare]=useState({});
    const [vehicalType,setVehicalType]=useState(null);
    const {socket}=useContext(SocketContext);
    const {user,}=useContext(UserDataContext);
    const [ride,setRide]=useState(null);

    useEffect(()=>{
        socket.emit("join",{userType:"user",userId:user._id})
    })

    socket.on('ride-confirmed',ride=>{
        console.log(ride)
        setVehicalFound(false);
        setWaitinForDriver(true);
        setRide(ride);
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`http://localhost:4000/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    const handleDestinationChange = async (e)=>{
        setDestination(e.target.value);
        try{
            const response = await axios.get(`http://localhost:4000/maps/get-suggestions`,{
            params:{input:e.target.value},
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
                    transform:"translateY(0)",
                    
                })
            }else{
                gsap.to(confirmeRidePanelRef.current,{
                    transform:"translateY(100%)",
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

    async function findTrip(){
        setVehicalPanel(true);
        setPanelOpen(false);

            const response = await axios.get(`http://localhost:4000/rides/getFare`,{
                params:{pickup,destination},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }

            })
            setFare(response.data);
            
    }

    async function createRide(){

        const response = await axios.post(`http://localhost:4000/rides/create`,{
            pickup,
            destination,
            vehicalType
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })

        console.log(response.data);
    }
        
    return (
        <div className="h-screen relative overflow-hidden">
           
    `       <div className="absolute top-0 h-screen w-screen ">
                 <img className="w-16 absolute left-5 top-5" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png" alt="" />
                 <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
            </div>
            <div className="absolute  top-0 w-full flex flex-col justify-end h-screen  ">
                <div className="h-[30%] bg-white p-6 relative">
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
                         setActiveField("destination");
                        }}
                        value={destination}
                        //setDestination(e.target.value)
                        onChange={handleDestinationChange} 
                        />
                    </form>
                    <button onClick={findTrip} className="bg-black w-full text-white text-lg py-3 rounded-lg mb-10">Find Trip</button>
                </div>

                <div ref={panelRef} className=" h-0 bg-white ">
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
               <VehicalPanel  setVehicalType={setVehicalType}
               setVehicalPanel={setVehicalPanel} setConfirmeRidePanel={setConfirmeRidePanel} fare={fare}/>
            </div>

            <div ref={confirmeRidePanelRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12">
               <ConfirmRide pickup={pickup} destination={destination} fare={fare} vehicalType={vehicalType}
               createRide={createRide} setConfirmeRidePanel={setConfirmeRidePanel} setVehicalFound={setVehicalFound}/>
            </div>

            <div ref={vehicalFoundRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white translate-y-full ">
             <LookingForDriver pickup={pickup} destination={destination} fare={fare} vehicalType={vehicalType}
             setVehicalFound={setVehicalFound}/>
            </div>

            <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 w-full px-3 py-6 bg-white  pt-12">
             <WaitingForDriver setWaitinForDriver={setWaitinForDriver} ride={ride}/>
            </div>
        </div>
    
    )
}

export default Home;