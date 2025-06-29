import React, { useRef, useState } from 'react'
import logo2 from '../assets/logo2.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const UserHome = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // Animate Location Panel
  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [openPanel])

  // Animate Vehicle Panel
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: '100%',
      })
    }
  }, [vehiclePanel])

  // Animate Confirm Ride Panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: '100%',
      })
    }
  }, [confirmRidePanel])

  // Animate Vehicle Found panel
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        y: '100%',
      })
    }
  }, [vehicleFound])

  // Animate waiting for driver panel
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        y: '100%',
      })
    }
  }, [waitingForDriver])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Logo */}
      <img className="w-25 absolute left-3 top-2 z-10" src={logo2} alt="GoCabby logo" />

      {/* Background */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* Trip Form */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full z-10">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setOpenPanel(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer transition-opacity duration-300"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => setOpenPanel(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setOpenPanel(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => setVehiclePanel(true)}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden transition-all duration-300">
          <LocationSearchPanel setOpenPanel={setOpenPanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Vehicle Found Panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting For Driver Panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  )
}

export default UserHome