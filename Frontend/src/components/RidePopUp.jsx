import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      {/* arrow wala icon */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-2'>New Ride Available!</h3>

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
                <div className='flex w-screen p-3 gap-3'>
                    <button onClick={() => {
                        props.setRidePopUpPanel(false)
                    }} className='w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg'>Ignore</button>
                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true)
                    }}  className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>

                </div>
            </div>

    </div>
  )
}

export default RidePopUp
