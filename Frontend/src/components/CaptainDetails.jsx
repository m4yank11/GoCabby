import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

  const { captain, isLoading } = useContext(CaptainDataContext)

  // This is a "guard clause". If the data is still loading,
  // it shows a simple loading message and stops rendering the rest of the component.
  if (isLoading) {
    return <div className="text-center p-4">Loading Details...</div>;
  }

  // This is a second guard clause in case loading is finished but the data is still null (e.g., API error)
  if (!captain) {
    return <div className="text-center p-4">Could not load captain details.</div>;
  }


  return (
    <div>
      <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between gap-3'>
                <img className="h-12 w-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                {/* <h4 className='text-lg font-medium'>{ captain.fullName.firstName + " " + captain.fullName.lastName }</h4> */}
                <h4 className='text-xl font-medium'>{captain.fullName.firstName} {captain.fullName.lastName}</h4>
              </div>
              <div>
                
                <h4 className='text-2xl font-semibold'>₹295.20</h4>
                <p className='text-sm text-gray-700'>Earned</p>
              </div>
            </div>
            <div className='flex p-5 mt-6 bg-green-100 rounded-2xl items-start justify-center  gap-5'>
              <div className='text-center'>
                <i className="text-3xl mb-3 font-thin ri-time-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-3 font-thin ri-speed-up-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-3 font-thin ri-booklet-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
            </div>
    </div>
  )
}

export default CaptainDetails
