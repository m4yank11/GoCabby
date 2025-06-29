import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between gap-3'>
                <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                <h4 className='text-lg font-medium'>Abhijeet Kumar</h4>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>₹295.20</h4>
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
