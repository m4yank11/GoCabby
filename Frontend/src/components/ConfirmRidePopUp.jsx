import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const ConfirmRidePopUp = (props) => {

    const [Otp, setOtp] = useState('');

    const submitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <div className='h-screen'>
      {/* arrow wala icon */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-2'>Confirm this Ride to Start</h3>

            <div className='flex items-center justify-between mt-4 rounded-lg p-3 bg-yellow-300'>
                <div className='flex items-center justify-start gap-3'>
                    <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s" alt="" />
                    <h2 className='text-lg font-medium'>Prem Sharma</h2>
                </div>
                <div>
                    <h4 className='text-lg font-semibold'>2.2 Kms</h4>
                </div>

            </div>

            <div className='flex flex-col gap-2 justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                           <h3 className='font-medium text-lg'>561/3-A</h3>
                           <p className='text-base -mt-1 text-gray-600'>VR Trillium Mall, Nagpur</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 p-3 border-b-2 border-gray-300'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                           <h3 className='font-medium text-lg'>561/3-A</h3>
                           <p className='text-base -mt-1 text-gray-600'>Futala Lake, Nagpur</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-4 p-3'>
                        <i className="text-lg ri-money-rupee-circle-fill"></i>
                        <div>
                           <h3 className='font-medium text-lg'>₹251.16</h3>
                           <p className='text-base -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
                <div className='flex w-full flex-col gap-4 p-6 mt-2'>
                  <input
                    value={Otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    className="bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full"
                    placeholder='Enter OTP'
                  />
                  <Link
                    to='/CaptainRiding'
                    className='flex justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg active:scale-95'
                  >
                    Confirm
                  </Link>
                  <button
                    onClick={() => {
                      props.setConfirmRidePopUpPanel(false)
                      props.setRidePopUpPanel(false)
                    }}
                    className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg active:scale-95'
                  >
                    Cancel
                  </button>
                </div>
            </div>


    </div>
  )
}

export default ConfirmRidePopUp
