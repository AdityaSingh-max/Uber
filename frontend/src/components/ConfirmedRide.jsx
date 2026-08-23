import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div className="relative">

      {/* Down Arrow */}
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false)
        }}
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-4 pt-5">
        Confirm your Ride
      </h3>

      {/* Main Content */}
      <div className="flex flex-col items-center">

        {/* Car */}
        <img
          className="h-32 object-contain"
          src="https://th.bing.com/th/id/OIP.Nzua500x85IZf4hEgWUpYgHaHa?w=176&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt="car"
        />

        {/* Ride Details */}
        <div className="w-full mt-4">

          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg ri-map-pin-fill"></i>

            <div>
              <h3 className="text-lg font-medium">
                562/11-A
              </h3>

              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg ri-map-pin-user-line"></i>

            <div>
              <h3 className="text-lg font-medium">
                562/11-A
              </h3>

              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-cash-line"></i>

            <div>
              <h3 className="text-lg font-medium">
                ₹{props.fare[props.vehicleType]}
              </h3>

              <p className="text-sm -mt-1 text-gray-600">
                Cash
              </p>
            </div>
          </div>

        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false)
            props.createRide()
          }}
          className="w-full mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg"
        >
          Confirm
        </button>

      </div>
    </div>
  )
}

export default ConfirmedRide