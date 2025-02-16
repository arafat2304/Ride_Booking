import React from "react";

const CaptainDeaitails =()=>{
    return(
        <div>
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center justify-start gap-3">
            <img className="h-14 w-14 rounded-full" src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"/>
            <h4 className="text-lg font-medium">Arafat Malek</h4>
            </div>

            <div>
            <h4 className="text-lg font-medium">&#x20B9;193.20</h4>
            <p className="text-sm text-grey-600">Earned</p>
            </div>
        </div>
        <div className="flex gap-7 p-5 bg-gray-100 roundex-xl items-start">
            <div className="text-center">
                <i className="text-3xl font-thin mb-2 ri-timer-2-line"></i>
                <h4 className="text-lg font-medium">10.2</h4>
                <p className="text-sm text-grey-600">Hours Online</p>
            </div>
            <div className="text-center">
                <i class="text-3xl font-thin mb-2 ri-speed-up-fill"></i>
                <h4 className="text-lg font-medium">10.2</h4>
                <p className="text-sm text-grey-600">Hours Online</p>
            </div>
            <div className="text-center">
                <i class="text-3xl font-thin mb-2 ri-booklet-line"></i>
                <h4 className="text-lg font-medium">10.2</h4>
                <p className="text-sm text-grey-600">Hours Online</p>
            </div>
        </div>
    </div>
    )
}

export default CaptainDeaitails;