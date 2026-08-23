import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
        <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className='h-20' src="https://th.bing.com/th/id/OIP.Nzua500x85IZf4hEgWUpYgHaHa?w=176&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="" />
        <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzaki Alto</p>
            <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between items-center flex-col'>
        

        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className="text-lg ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-300'>
                <i className="text-lg ri-map-pin-user-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-gray-200'>
                <i className="text-lg ri-cash-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default WaitingForDriver