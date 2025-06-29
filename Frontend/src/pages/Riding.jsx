import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/UserHome' className='fixed left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
         </Link>


        <div className='h-1/2'>
            <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
            />
        </div>
        <div className='h-1/2 p-4'>
            <div>
            {/* arrow wala icon */}
                <h5 className='p-1 text-center w-[93%] absolute top-0'>
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>

                <div className='flex items-center justify-between'>
                    <img className='h-14' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Abhijeet</h2>
                        <h4 className='text-xl font-semibold -mt-1'>MH 19 CJ 5678</h4>
                        <p className='text-sm text-gray-600 -mt-1'>Maruti Sukuzi Desire LXI</p>
                    </div>
                    
                </div>

        
                <div className='flex flex-col gap-2 justify-between items-center'>

                    <div className='w-full mt-5'>
                        

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
            <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding
