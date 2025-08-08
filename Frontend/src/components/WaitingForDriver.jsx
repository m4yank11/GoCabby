import React from 'react';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  // --- FIX 1: Make the guard clause more robust ---
  // This checks for the captain object and its nested properties (fullName, vehicle)
  // before trying to render the component.
  if (!ride?.captain?.fullName || !ride?.captain?.vehicle) {
    return (
      <div className="p-4 text-center">
        Waiting for driver details...
      </div>
    );
  }

  // --- FIX 2 (Optional but good practice): Destructure for cleaner code ---
  const { captain, pickup, destination, fare } = ride;
  const { fullName, vehicle } = captain;

  return (
    <div>
      {/* Close button */}
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        setWaitingForDriver(false);
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img className='h-14' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/56x56/CCCCCC/FFFFFF?text=Car'; }}/>
        <div className='text-right'>
          {/* Now we can safely display the dynamic info */}
          <h2 className='text-lg font-medium'>{fullName.firstName} {fullName.lastName}</h2>
          <h4 className='text-xl font-semibold -mt-1'>{vehicle.plate}</h4>
          <p className='text-sm text-gray-600 -mt-1'>{vehicle.color} {vehicle.type}</p>
        </div>
      </div>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='font-medium text-lg'>{pickup}</h3>
              <p className='text-base -mt-1 text-gray-600'>Pickup Location</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='font-medium text-lg'>{destination}</h3>
              <p className='text-base -mt-1 text-gray-600'>Destination</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='font-medium text-lg'>₹{fare}</h3>
              <p className='text-base -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
