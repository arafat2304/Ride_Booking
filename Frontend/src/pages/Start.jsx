import React from "react";
import { Link } from "react-router-dom";
export default function Start() {

  return(
    <div>
      <div className="bg-cover bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg)] h-screen pt-8  w-full flex justify-between flex-col">
        <img className="w-16 ml-8" src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"/>
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with uber</h2>
          <Link to="/login" className=" flex justify-center item-center w-full bg-black text-white rounded py-3 mt-5" >Continue</Link>
        </div>
      </div>
    </div>
  )
}