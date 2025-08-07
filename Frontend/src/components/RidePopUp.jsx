import React from 'react';

// --- FIX 1: Accept 'ride' as a prop ---
const RidePopUp = ({ ride, setRidePopUpPanel, setConfirmRidePopUpPanel }) => {

  // --- FIX 2: Add a "guard clause" ---
  // This is crucial. It handles the initial state when there is no ride request
  // and prevents the component from crashing if the ride object is missing expected data.
  if (!ride || !ride.user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Waiting for new ride requests...
      </div>
    );
  }

  return (
    <div>
      {/* Close button */}
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        setRidePopUpPanel(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-2'>New Ride Available!</h3>

      <div className='flex items-center justify-between mt-4 rounded-lg p-3 bg-yellow-300'>
        <div className='flex items-center justify-start gap-3'>
          <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s" alt="User" />
          {/* --- FIX 3: Display dynamic user name --- */}
          <h2 className='text-lg font-medium'>{ride.user.fullName.firstName} {ride.user.fullName.lastName}</h2>
        </div>
        <div>
          {/* You can calculate and display this distance later */}
          <h4 className='text-lg font-semibold'>{(ride.distance / 1000).toFixed(1)} Kms</h4>
        </div>
      </div>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              {/* --- FIX 4: Display dynamic pickup location --- */}
              <h3 className='font-medium text-lg'>{ride.pickup}</h3>
              <p className='text-base -mt-1 text-gray-600'>Pickup Location</p>
            </div>
          </div>

          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              {/* --- FIX 5: Display dynamic destination --- */}
              <h3 className='font-medium text-lg'>{ride.destination}</h3>
              <p className='text-base -mt-1 text-gray-600'>Destination</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              {/* --- FIX 6: Display dynamic fare --- */}
              <h3 className='font-medium text-lg'>₹{ride.fare}</h3>
              <p className='text-base -mt-1 text-gray-600'>Cash Payment</p>
            </div>
          </div>
        </div>
        <div className='flex w-full p-3 gap-3'>
          <button onClick={() => {
            setRidePopUpPanel(false)
          }} className='w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg'>Ignore</button>
          <button onClick={() => {
            setRidePopUpPanel(false); // Close this panel
            setConfirmRidePopUpPanel(true); // Open the next panel
          }}  className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
