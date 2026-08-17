import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={()=>{
        props.setConfirmRidePanel(true)
      }} className="flex w-full p-3 border-2 border-gray-400 active:border-black mb-2 rounded-xl items-center justify-between">
        <img
          className="h-20"
          src="https://th.bing.com/th/id/OIP.Nzua500x85IZf4hEgWUpYgHaHa?w=176&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberGo&nbsp;
             <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affoadable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹192.92</h2>
      </div>

      <div onClick={()=>{
        props.setConfirmRidePanel(true)
      }} className="flex w-full p-3 border-2  border-gray-400 active:border-black mb-2 rounded-xl items-center justify-between">
        <img
          className="h-16"
          src="https://static.vecteezy.com/system/resources/previews/024/819/250/original/electric-motorbike-electric-bike-e-bike-e-motorbike-electric-vehicle-e-vehicle-transparent-background-ai-generated-png.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto&nbsp;
             <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affoadable, motercycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹66</h2>
      </div>

      <div onClick={()=>{
        props.setConfirmRidePanel(true)
      }} className="flex w-full p-3 border-2  border-gray-400 active:border-black mb-2 rounded-xl items-center justify-between">
        <img
          className="h-12"
          src="https://tse4.mm.bing.net/th/id/OIP.GPl2w15wsHCmqqfxDQthsAAAAA?r=0&pid=ImgDet&w=184&h=142&c=7&dpr=1.3&o=7&rm=3"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto&nbsp;
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affoadable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹120</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
