import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      
      <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className="text-lg font-medium ri-home-4-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://th.bing.com/th/id/OIP.Nzua500x85IZf4hEgWUpYgHaHa?w=176&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Aryan</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">BR06 XX 6262</h4>
            <p className="text-sm text-gray-600">Maruti Suzaki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center flex-col">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
              <i className="text-lg ri-map-pin-user-line"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Tej Pratap Nagar, Patna
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-gray-200">
              <i className="text-lg ri-cash-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹192.92</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>

    </div>
  );
};

export default Riding;
