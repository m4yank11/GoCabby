import React, { useRef, useState, useEffect, useContext } from 'react'
import logo2 from '../assets/logo2.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import {SocketContext} from '../context/SocketContext.jsx'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext.jsx'


const UserHome = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  // We need a state to track which input field is currently active.
  const [activeField, setActiveField] = useState('pickup');

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const { socket, sendMessage, receiveMessage } = useContext(SocketContext)
  // --- FIX 1: Correctly destructure the context object ---
  const { user, setUser, setIsLoading } = useContext(UserDataContext);

  const navigate = useNavigate()

  // --- FIX 2: Add useEffect to fetch user profile data ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/UserLogin');
          return;
        }
        // Assuming you have a '/User/profile' endpoint
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/User/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user); // Update context with user data
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate('/UserLogin');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch if user data isn't already present
    if (!user) {
        fetchUserProfile();
    } else {
        setIsLoading(false);
    }
  }, []); // Empty array ensures this runs only once on mount

  // --- FIX 3: Add a separate useEffect for socket logic ---
  useEffect(() => {
    // This guard clause prevents the code from running before user data is loaded
    if (user && user._id && socket) {
      console.log(`User ${user._id} joining socket room.`);
      sendMessage("join", { userType: "user", userId: user._id });
    }
    // This effect runs whenever the user or socket connection changes
  }, [user, socket, sendMessage]);


  // --- NEW: useEffect to listen for ride acceptance ---
  useEffect(() => {
    if (socket && receiveMessage) {
      receiveMessage('ride-accepted', (acceptedRide) => {
        console.log("Ride has been accepted by a captain:", acceptedRide);
        setRide(acceptedRide); // Update the ride state with captain details
        setVehicleFound(false); // Hide the "Looking for driver" panel
        setWaitingForDriver(true); // Show the "Waiting for driver" panel
      });
    }
    return () => {
      if (socket) {
        socket.off('ride-accepted');
      }
    };
  }, [socket, receiveMessage]);



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

async function findTripFare() {
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination locations.");
      return;
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Ride/get-fare`, { 
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      console.log("Fare data received:", response.data);
      setFare(response.data.fare); 
      setVehiclePanel(true);
      setOpenPanel(false);

    } catch (error) {
      console.error("Error fetching fare:", error);
      alert("Could not fetch fare. Please check the locations and try again.");
    }
  }
 
  // --- CORRECTED FUNCTION ---
  // This function now correctly handles the API call and the UI state transitions.
  async function createRide() {
    if (!vehicleType) {
      alert("Please select a vehicle type first.");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Ride/create`, {
        pickup,
        destination,
        vehicleType 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("Ride created:", response.data);
      setRide(response.data); // Save the created ride

      // --- FIX: Manage UI flow after successful API call ---
      // Only transition to the next panel after the ride is created.
      setConfirmRidePanel(false);
      setVehicleFound(true);

    } catch (error) {
      console.error("Error creating ride:", error);
      alert("An error occurred while creating your ride. Please try again.");
    }
  }


  return (
    <div className="relative h-screen overflow-hidden">
      {/* Logo */}
      <img className="w-25 absolute left-3 top-2 z-10" src={logo2} alt="GoCabby logo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x40/000000/FFFFFF?text=Logo'; }} />

      {/* Background */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map background"
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

            {/* Update the onClick to set the activeField state */}
            <input
              onClick={() => { setOpenPanel(true); setActiveField('pickup'); }}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your pick-up location"
            />

            {/* Update the onClick to set the activeField state */}
            <input
              onClick={() => { setOpenPanel(true); setActiveField('destination'); }}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => {findTripFare()}}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full active:scale-95"
          >
            Find Trip
          </button>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden transition-all">
          {/* --- THE FIX (Part 4) --- */}
          {/* Now 'activeField' is defined and this will work correctly */}
          <LocationSearchPanel 
            query={activeField === 'pickup' ? pickup : destination} 
            setQuery={activeField === 'pickup' ? setPickup : setDestination} 
            setOpenPanel={setOpenPanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <VehiclePanel 
          //createRide={createRide}
          selectVehicle = {setVehicleType}
          fare={fare} 
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehiclePanel={setVehiclePanel} 
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <ConfirmRide 
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Vehicle Found Panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12 z-20"
        style={{ transform: 'translateY(100%)' }}
      >
        <LookingForDriver 
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
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

export default UserHome;
