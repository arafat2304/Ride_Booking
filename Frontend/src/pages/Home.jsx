import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const [vehicalPanel, setVehicalPanel] = useState(false);
    const vehicalPanelRef = useRef(null);

    const [confirmeRidePanel, setConfirmeRidePanel] = useState(false);
    const confirmeRidePanelRef = useRef(null);

    const [vehicalFound, setVehicalFound] = useState(false);
    const vehicalFoundRef = useRef(null);

    const [waitingForDriver, setWaitinForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicalType, setVehicalType] = useState(null);
    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);
    const navigate = useNavigate();

    const userId = localStorage.getItem("user");

    useEffect(() => {
        socket.emit("join", { userType: "user", userId });
    }, [user]);

    useEffect(() => {
        socket.on("ride-confirmed", (ride) => {
            setVehicalFound(false);
            setWaitinForDriver(true);
            setRide(ride);
        });

        socket.on("ride-started", (ride) => {
            setWaitinForDriver(false);
            navigate("/riding", { state: { ride } });
        });

        socket.on("ride-ended", () => {
            navigate("/home");
        });
    }, []);

    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panelOpen ? "70%" : "0%",
            padding: panelOpen ? 24 : 0,
            duration: 0.3,
        });
        gsap.to(panelCloseRef.current, {
            opacity: panelOpen ? 1 : 0,
            duration: 0.3,
        });
    }, [panelOpen]);

    const animatePanel = (ref, state) => {
        useGSAP(() => {
            gsap.to(ref.current, {
                y: state ? 0 : "100%",
                duration: 0.3,
            });
        }, [state]);
    };

    animatePanel(vehicalPanelRef, vehicalPanel);
    animatePanel(confirmeRidePanelRef, confirmeRidePanel);
    animatePanel(vehicalFoundRef, vehicalFound);
    animatePanel(waitingForDriverRef, waitingForDriver);

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setPickupSuggestions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setDestinationSuggestions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const findTrip = async () => {
        setVehicalPanel(true);
        setPanelOpen(false);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/getFare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setFare(response.data);
    };

    const createRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/create`, {
            pickup,
            destination,
            vehicalType,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
    };

    return (
        <div className="h-screen relative overflow-hidden">
            <div className="absolute top-0 h-screen w-screen z-0 lg:w-1/2 lg:mx-[300px] lg:h-[300px]">
                <LiveTracking />
            </div>

            <div className="absolute top-0 w-full flex flex-col justify-end h-screen z-10">
                <div className="h-[30%] bg-white p-6 relative lg:w-1/2 lg:mx-[300px] lg:h-[300px] lg:pt-[50px]">
                    <h5 ref={panelCloseRef} className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer" onClick={() => setPanelOpen(false)}>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <div className="flex justify-between">
                        <h4 className="text-2xl font-semibold mb-3">Find a trip</h4>
                        <Link to="/login"><i className="text-3xl ri-logout-box-r-line"></i></Link>
                    </div>

                    <input
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3"
                        type="text"
                        placeholder="Add a pickup location"
                        onClick={() => { setPanelOpen(true); setActiveField("pickup"); }}
                        onChange={handlePickupChange}
                        value={pickup}
                    />

                    <input
                        className="bg-[#eee] w-full border rounded-lg text-lg px-8 py-3 mb-3"
                        type="text"
                        placeholder="Enter your destination"
                        onClick={() => { setPanelOpen(true); setActiveField("destination"); }}
                        onChange={handleDestinationChange}
                        value={destination}
                    />

                    <button onClick={findTrip} className="bg-black w-full text-white text-lg py-3 rounded-lg">Find Trip</button>
                </div>

                <div ref={panelRef} className="overflow-hidden bg-white">
                    <LocationSearchPanel
                        suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehicalPanel={setVehicalPanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            <div ref={vehicalPanelRef} className="fixed bottom-0 w-full px-3 py-10 bg-white translate-y-full pt-12 z-20">
                <VehicalPanel
                    setVehicalType={setVehicalType}
                    setVehicalPanel={setVehicalPanel}
                    setConfirmeRidePanel={setConfirmeRidePanel}
                    fare={fare}
                />
            </div>

            <div ref={confirmeRidePanelRef} className="fixed bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12 z-20">
                <ConfirmRide
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicalType={vehicalType}
                    createRide={createRide}
                    setConfirmeRidePanel={setConfirmeRidePanel}
                    setVehicalFound={setVehicalFound}
                />
            </div>

            <div ref={vehicalFoundRef} className="fixed bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12 z-20">
                <LookingForDriver
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicalType={vehicalType}
                    setVehicalFound={setVehicalFound}
                />
            </div>

            <div ref={waitingForDriverRef} className="fixed bottom-0 w-full px-3 py-6 bg-white translate-y-full pt-12 z-20">
                <WaitingForDriver setWaitinForDriver={setWaitinForDriver} ride={ride} />
            </div>
        </div>
    );
};

export default Home;
