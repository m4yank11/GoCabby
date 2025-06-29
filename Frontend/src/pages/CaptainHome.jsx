import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import logo2 from '../assets/logo2.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'


const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  // Animate Ride Pop Up Panel
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        y: '100%',
      })
    }
  }, [ridePopUpPanel])

    // Animate confirm Ride Pop Up Panel
  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        y: '100%',
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div>

        <div className='fixed p-5 top-0 flex items-center justify-between'>
         
          <Link to='/CaptainLogin' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-line"></i>
          </Link>
           <img className="w-25" src={logo2} alt="GoCabby logo" />
        </div>


        <div className='h-3/5'>
            <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
            />
        </div>
        <div className='h-2/5 p-5'>
            <CaptainDetails />
        </div>
        {/* Ride pop up Panel */}
        <div 
        ref={ridePopUpPanelRef} 
        className="fixed w-full bottom-0  bg-white px-3 py-6 pt-12 z-20 tranlate-y-full">
           <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        <div 
        ref={confirmRidePopUpPanelRef} 
        className="fixed w-full bottom-0 h-screen bg-white px-3 py-6 pt-12 z-20 tranlate-y-full">
           <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div>
    </div>
  )
}

export default CaptainHome
