import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        "13B, KT Nagar, near Pallazio Mall, Nagpur",
        "10C, Shastri Nagar, near Emporio Mall, Nagpur",
        "13D, near CafeCoffeeDay,Jaljog Circle, Nagpur",
        "91, near Punjabi Dhaba, near AirForce, Nagpur"
    ]

  return (
    <div>
        {/* this is just a sample data */}

        {
            locations.map(function(element, idx){
                return <div key={idx} onClick={() => {
                    // props.setVehiclePanel(true)
                    // props.setOpenPanel(false)
                }}
                className='flex items-center rounded-xl border-gray-50 active:border-black border-2 p-3 justify-start gap-4 my-2'>
                    <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium'>{element}</h4>
                </div>
            })
        }
        
    </div>
  )
}

export default LocationSearchPanel
