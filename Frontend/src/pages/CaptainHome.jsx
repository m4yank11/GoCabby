import React, { useRef, useState, useEffect, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';


const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  const [rideRequest, setRideRequest] = useState(null);



  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { socket, sendMessage, receiveMessage } = useContext(SocketContext);
  // --- FIX 1: Get 'captain' data from its context ---
  const { captain, setCaptain, setIsLoading } = useContext(CaptainDataContext);



  // The useEffect hook should have an empty dependency array [] to ensure it
  // runs only once when the component mounts. This is the standard pattern for initial data fetching and prevents infinite loops.
useEffect(() => {
    const fetchCaptainProfile = async () => {
      // Only fetch if captain data is not already loaded
      if (!captain) {
        setIsLoading(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/CaptainLogin');
            return;
          }
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Captain/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCaptain(response.data.captain);
        } catch (error) {
          console.error("API Error:", error.response?.data || error.message);
          if (error.response?.status === 401 || error.response?.status === 403) {
            navigate('/CaptainLogin');
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchCaptainProfile();
  }, []);

  // --- FIX 3: Corrected socket useEffect ---
  useEffect(() => {
    if (captain && captain._id && socket) {
      console.log(`Captain ${captain._id} joining socket room.`);
      // Your backend expects 'role', not 'userType'
      sendMessage("join", { role: "captain", userId: captain._id });
    }
    // The dependency array now correctly watches for changes to 'captain'
  }, [captain, socket, sendMessage]);

  // --- Listen for new ride requests ---
  useEffect(() => {
        if (socket && receiveMessage) {
            // Listen for the 'new-ride-request' event from the server
            receiveMessage('new-ride-request', (newRide) => {
                console.log("New ride request received:", newRide);
                setRideRequest(newRide); // Store the ride data
                setRidePopUpPanel(true); // Show the ride request pop-up
            });
        }

        // Clean up the listener when the component unmounts
        return () => {
            if (socket) {
                socket.off('new-ride-request');
            }
        };
    }, [socket, receiveMessage]);

  useGSAP(() => { if (ridePopUpPanel) { gsap.to(ridePopUpPanelRef.current, { y: '0%' }); } else { gsap.to(ridePopUpPanelRef.current, { y: '100%' }); } }, [ridePopUpPanel]);
  useGSAP(() => { if (confirmRidePopUpPanel) { gsap.to(confirmRidePopUpPanelRef.current, { y: '0%' }); } else { gsap.to(confirmRidePopUpPanelRef.current, { y: '100%' }); } }, [confirmRidePopUpPanel]);

  return (

    <div className="relative h-screen flex flex-col">
      <div className='absolute p-5 top-0 flex items-center justify-between w-full z-10'>
        <Link to='/CaptainLogin' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
        <img className="w-25" src={logo2} alt="GoCabby logo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x40/000000/FFFFFF?text=Logo'; }}/>
      </div>


      <div className='flex-grow h-full'>
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map background"
        />
      </div>
      
      {/* Captain Details Panel */}
      <div className='p-5 bg-white'>
        <CaptainDetails />
      </div>

      {/* Ride pop up Panel */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full bottom-0  bg-white px-3 py-6 pt-12 z-20 translate-y-full">
        <RidePopUp
          ride={rideRequest}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

      <div
        ref={confirmRidePopUpPanelRef}

        className="fixed w-full bottom-0 h-screen bg-white px-3 py-6 pt-12 z-20 translate-y-full">
        <ConfirmRidePopUp 
          ride= { rideRequest }
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
          setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
