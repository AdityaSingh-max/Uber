import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
        <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className='flex gap-2 justify-between items-center flex-col'>
        <img
          className="h-40"
          src="https://th.bing.com/th/id/OIP.Nzua500x85IZf4hEgWUpYgHaHa?w=176&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt=""
        />

        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className="text-lg ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className="text-lg ri-map-pin-user-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-gray-200'>
                <i className="text-lg ri-cash-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default LookingForDriver