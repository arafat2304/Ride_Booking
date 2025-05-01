import React from "react";
import { Link, useLocation} from "react-router-dom";
import { useEffect,useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "./LiveTracking";

const Riding = () => {

    const {socket} = useContext(SocketContext);
    const navigator = useNavigate();

    
    socket.on("ride-end",ride=>{
        navigator("/home");
    });

    const location = useLocation();
    const {ride} = location.state;
    console.log(ride);
    return (
        <div className="h-screen lg:w-1/2 lg:mx-[300px] lg:h-[300px]">
            <Link to="/home" className="fixed top-2 right-2 bg-white w-10 h-10 flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-home-4-line"></i>
            </Link>
             <div className="h-[60%] ">
             {/* <img  className="h-full w-full object-cover" src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" /> */}
             <LiveTracking/>
             </div>

            <div className="h-[40%] p-4">
                <div className="flex items-center justify-between">
                    <img className="h-20" src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"></img>
                    <div className="text-right">
                        <h2 className="text-lg font-medium">{ride?.captain.fullName.firstName}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehical.plate}</h4>
                        <p className="text-sm text-grey-600">Maruti Suzuki Alto</p>
                    </div>
                </div>
                <div className=" gap-2 flex justify-between items-center flex-col">
                    <div className="w-full mt-5">
                       
                        <div className="flex items-center gap-5 p-3 border-b-2">
                            <i className="ri-map-pin-user-fill text-lg"></i>
                            <div>
                                <h3 className="text-lg font-medium">562/11-A</h3>
                                <p className="text-sm text-grey-600">{ride?.destination}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3">
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className="text-lg font-medium">&#8377;{ride?.fare}</h3>
                                <p className="text-sm text-grey-600">Cash</p>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="w-full mt-5 bg-green-600 p-2 font-semibold text-white rounded-lg">Make a Payment</button>
            </div>
        </div>
        
    );
};

export default Riding;