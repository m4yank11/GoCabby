import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Accept the `ride` object as a prop
const FinishRide = ({ ride, setFinishRidePanel }) => {
    const navigate = useNavigate();

    // 2. Create the function to handle the API call
    const handleCompleteRide = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ride/complete`, // Use the new endpoint
                { rideId: ride._id }, // Send the ride's unique ID
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Ride completed successfully!");
                navigate('/CaptainHome'); // Redirect home after success
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to complete ride. Please try again.";
            console.error("Failed to complete ride:", errorMessage);
            alert(errorMessage);
        }
    };

    // 3. Add a guard clause
    if (!ride) return null;

    return (
        <div className="h-full">
            <div className="bg-white h-full w-full rounded-t-2xl p-2 ">
                {/* Close button */}
                <h5
                    className="p-1 text-center w-[93%] absolute top-2 left-1/2 -translate-x-1/2 cursor-pointer"
                    onClick={() => setFinishRidePanel(false)}>
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className="text-2xl font-semibold mb-8">Finish this Ride</h3>

                {/* 4. Replace ALL hardcoded data with dynamic data from the 'ride' prop */}
                <div className="flex items-center justify-between mt-4 rounded-lg p-4 border-2 border-yellow-300">
                    <div className="flex items-center justify-start gap-3">
                        {/* You can add a dynamic user image here later if available */}
                        <img className="h-10 w-10 rounded-full object-cover" src="https://...default-user.png" alt="User" />
                        <h2 className="text-lg font-medium">{ride.user.fullName.firstName} {ride.user.fullName.lastName}</h2>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold">{(ride.distance / 1000).toFixed(1)} Kms</h4>
                    </div>
                </div>

                <div className="w-full mt-5">
                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="font-medium text-lg">{ride.pickup}</h3>
                            <p className="text-base -mt-1 text-gray-600">Pickup Location</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="font-medium text-lg">{ride.destination}</h3>
                            <p className="text-base -mt-1 text-gray-600">Destination</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3">
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className="font-medium text-lg">₹{ride.fare}</h3>
                            <p className="text-base -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4 mt-4">
                    {/* 5. THIS IS THE FIX: A button that calls our new function */}
                    <button
                        onClick={handleCompleteRide}
                        className="flex justify-center w-full bg-green-600 text-white font-semibold p-3 rounded-lg active:scale-95"
                    >
                        Confirm Ride Completion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinishRide;