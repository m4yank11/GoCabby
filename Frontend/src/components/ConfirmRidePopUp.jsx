import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- FIX 1: Accept 'ride' as a prop ---
const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const [Otp, setOtp] = useState('');

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

    try {
      // Call the new backend endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/Ride/accept`,
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
        // On success, navigate the captain to the riding page
        navigate('/CaptainRiding');
      }
    } catch (error) {
      console.error("Failed to accept ride:", error.response?.data?.message || error.message);
      // Display the specific error message from the backend (e.g., "Invalid OTP")
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
    <div className='h-screen p-4'>
      {/* Close button */}
      <h5 className='p-1 text-center w-full absolute top-0 left-0' onClick={() => {
        setConfirmRidePopUpPanel(false);
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-2'>Confirm this Ride to Start</h3>

      <div className='flex items-center justify-between mt-4 rounded-lg p-3 bg-yellow-300'>
        <div className='flex items-center justify-start gap-3'>
          <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s" alt="User" />
          {/* --- FIX 3: Display dynamic user name --- */}
          <h2 className='text-lg font-medium'>{ride.user.fullName.firstName} {ride.user.fullName.lastName}</h2>
        </div>
        <div>
          {/* --- FIX 4: Display dynamic distance --- */}
          <h4 className='text-lg font-semibold'>{(ride.distance / 1000).toFixed(1)} Kms</h4>
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
  );
};

export default ConfirmRidePopUp;
