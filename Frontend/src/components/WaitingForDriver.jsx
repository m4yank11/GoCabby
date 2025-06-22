import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
        {/* arrow wala icon */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setWaitingForDriver(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='flex items-center justify-between'>
                <img className='h-14' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Abhijeet</h2>
                    <h4 className='text-xl font-semibold -mt-1'>MH 31 CJ 5678</h4>
                    <p className='text-sm text-gray-600 -mt-1'>Maruti Sukuzi Desire LXI</p>
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
                           <h3 className='font-medium text-lg'>251.16</h3>
                           <p className='text-base -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
            </div>
    </div>
  )
}

export default WaitingForDriver
