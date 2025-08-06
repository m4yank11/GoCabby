import React from 'react';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  // Guard clause to prevent crashes if the ride or captain data is not yet available
  if (!ride || !ride.captain) {
    return (
      <div className="p-4 text-center">
        Waiting for driver details...
      </div>
    );
  }

  return (
    <div>
      {/* Close button */}
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        setWaitingForDriver(false);
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className='h-14' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
        <div className='text-right'>
          {/* --- FIX: Display dynamic captain and vehicle info --- */}
          <h2 className='text-lg font-medium'>{ride.captain.fullName.firstName} {ride.captain.fullName.lastName}</h2>
          <h4 className='text-xl font-semibold -mt-1'>{ride.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600 -mt-1'>{ride.captain.vehicle.color} {ride.captain.vehicle.type}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              {/* --- FIX: Display dynamic pickup location --- */}
              <h3 className='font-medium text-lg'>{ride.pickup}</h3>
              <p className='text-base -mt-1 text-gray-600'>Pickup Location</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* --- FIX: Display dynamic destination --- */}
              <h3 className='font-medium text-lg'>{ride.destination}</h3>
              <p className='text-base -mt-1 text-gray-600'>Destination</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              {/* --- FIX: Display dynamic fare --- */}
              <h3 className='font-medium text-lg'>₹{ride.fare}</h3>
              <p className='text-base -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
