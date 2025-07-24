import React, {useState} from 'react'
import logo2 from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import FinishRide from '../components/FinishRide';
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null)

    useGSAP(function() {
    if (finishRidePanel  ) {
      gsap.to(finishRidePanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: '100%',
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className="w-25" src={logo2} alt="GoCabby logo" />
        <Link to="/CaptainHome" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
      onClick={()=>{
        setFinishRidePanel(true)
      }}>
        <h5 className=' text-center w-[90%] absolute top-0'><i className="text-3xl text-black-200 ri-arrow-up-wide-line"></i>
          </h5>
        <h4 className='text-xl font-semibold'>4 kms away</h4>
        <button className=' bg-green-600 text-white font-semibold p-2 px-10 rounded-lg text-lg'>Complete Ride</button>

      </div>
       {/* Ride pop up Panel */}
        <div 
        ref={finishRidePanelRef} 
        className="fixed w-full bottom-0  bg-white px-3 py-6 pt-12 z-20 tranlate-y-full">
           <FinishRide setFinishRidePanel= {setFinishRidePanel}/>
        </div>
    </div>
  )
}


export default CaptainRiding