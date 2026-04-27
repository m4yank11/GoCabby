import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- FIX 1: Accept 'ride' as a prop ---
const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const [Otp, setOtp] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // We will add OTP verification logic here later
  };

  // --- NEW: Function to handle ride confirmation ---
  const handleConfirmRide = async (e) => {
    e.preventDefault();

    if (!ride || !ride._id) {
      alert("Error: Ride information is missing.");
      return;
    }
    if (Otp.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }
    console.log(`Attempting to accept ride ${ride._id} with OTP:`, Otp);
    console.log(`Type of OTP state: ${typeof otp}, Length: ${Otp.length}`);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/accept`,
        {
          rideId: ride._id,
          otp: Otp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Ride accepted successfully!", response.data.ride);
        navigate('/CaptainRiding', { state: { ride: response.data.ride } });
      }
    } catch (error) {
      console.error("Failed to accept ride:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to accept ride. Please try again.");
    }
  };
  // --- FIX 2: Add a "guard clause" ---
  // This prevents the component from crashing if the ride data is not yet available.
  if (!ride || !ride.user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading ride details...
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <h3 className='text-2xl font-extrabold text-gray-800 text-center mb-6 tracking-tight'>Confirm Ride Acceptance</h3>

        <div className='flex items-center justify-between bg-yellow-100/80 border border-yellow-300 rounded-2xl p-4 shadow-sm mb-6'>
          <div className='flex items-center gap-3'>
            <img className="h-12 w-12 rounded-full border-2 border-white shadow-md object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s" alt="User" />
            <h2 className='text-xl font-bold text-gray-800'>{ride.user.fullName.firstName} {ride.user.fullName.lastName}</h2>
          </div>
          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm">
            <h4 className='text-sm font-bold tracking-wide'>{(ride.distance / 1000).toFixed(1)} Kms</h4>
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                {/* --- FIX 5: Display dynamic pickup location --- */}
                <h3 className='font-medium text-lg'>{ride.pickup}</h3>
                <p className='text-base -mt-1 text-gray-600'>Pickup Location</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                {/* --- FIX 6: Display dynamic destination --- */}
                <h3 className='font-medium text-lg'>{ride.destination}</h3>
                <p className='text-base -mt-1 text-gray-600'>Destination</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-3'>
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                {/* --- FIX 7: Display dynamic fare --- */}
                <h3 className='font-medium text-lg'>₹{ride.fare}</h3>
                <p className='text-base -mt-1 text-gray-600'>Cash</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleConfirmRide} className='flex w-full flex-col gap-4 p-6 mt-2'>
            <input
              value={Otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full"
              placeholder='Enter OTP'
            />
            {/* Using a button with type="submit" is better for forms */}
            <button
              type="submit"
              className='flex justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg active:scale-95'
            >
              Confirm
            </button>
            <button
              type="button" // Set type to "button" to prevent form submission
              onClick={() => {
                setConfirmRidePopUpPanel(false);
                setRidePopUpPanel(false);
              }}
              className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg active:scale-95'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
