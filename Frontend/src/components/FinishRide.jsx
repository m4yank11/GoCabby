import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div className="h-full">
      <div className="bg-white h-full w-full rounded-t-2xl p-2 ">
        {/* arrow wala icon */}
        <h5
          className="p-1 text-center w-[93%] absolute top-2 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => props.setFinishRidePanel(false)}
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-8">Finish this Ride</h3>

        <div className="flex items-center justify-between mt-4 rounded-lg p-4 border-2 border-yellow-300">
          <div className="flex items-center justify-start gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s" alt="" />
            <h2 className="text-lg font-medium">Prem Sharma</h2>
          </div>
          <div>
            <h4 className="text-lg font-semibold">2.2 Kms</h4>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="font-medium text-lg">561/3-A</h3>
                <p className="text-base -mt-1 text-gray-600">VR Trillium Mall, Nagpur</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="font-medium text-lg">561/3-A</h3>
                <p className="text-base -mt-1 text-gray-600">Futala Lake, Nagpur</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="font-medium text-lg">₹251.16</h3>
                <p className="text-base -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4  mt-2">
            <Link
              to="/CaptainRiding"
              className="flex justify-center w-full bg-green-600 text-white font-semibold p-3 rounded-lg active:scale-95"
            >
              Completed Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinishRide
