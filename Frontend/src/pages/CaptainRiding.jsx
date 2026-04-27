import React, { useState, useEffect, useRef, useContext } from 'react'
import logo2 from '../assets/logo2.png'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [currentDistance, setCurrentDistance] = useState(null);
  const { sendMessage } = useContext(SocketContext);

  const finishRidePanelRef = useRef(null)
  const location = useLocation();
  const ride = location.state?.ride;

  // Haversine formula to calculate km distance between coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  }

  useEffect(() => {
    if (!ride) return;
    const fetchCoords = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${ride.destination}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.data && res.data.data) {
          setDestinationCoords(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching destination coordinates", err);
      }
    };
    fetchCoords();
  }, [ride]);

  useEffect(() => {
    if (!destinationCoords) return;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(latitude, longitude, destinationCoords.lat, destinationCoords.lng);
        setCurrentDistance(dist);

        // Broadcast to user
        sendMessage('update-location-captain', {
          userId: ride.user._id,
          location: { latitude, longitude },
          distance: dist
        });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [destinationCoords]);

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: '0%',
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: '100%',
      })
    }
  }, [finishRidePanel])

  if (!ride) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
        <p className='text-gray-500 mb-4'>Loading ride data or direct access not allowed.</p>
        <Link to="/CaptainHome" className='bg-green-600 text-white px-4 py-2 rounded-lg'>Go Home</Link>
      </div>
    );
  }

  return (
    <div className='h-screen relative overflow-hidden bg-gray-100 flex flex-col'>
      {/* Top Header */}
      <div className='absolute p-5 top-0 flex items-center justify-between w-full z-10'>
        <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
          <img className="w-20" src={logo2} alt="GoCabby logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x40/000000/FFFFFF?text=Logo'; }} />
        </div>
        <Link to="/CaptainHome" className='h-10 w-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full shadow-lg hover:bg-white transition-all'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      {/* Live Distance Tracking Overlay over Map */}
      <div className='absolute top-24 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-sm'>
        <div className='bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex flex-col items-center border border-white/40'>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1'>Remaining Distance</span>
          <h2 className='text-4xl font-extrabold text-blue-600'>
            {currentDistance ? `${currentDistance} km` : 'Locating...'}
          </h2>
          <div className='w-full bg-blue-100 h-1.5 rounded-full mt-3 overflow-hidden'>
            <div className='bg-blue-600 h-full rounded-full w-2/3 animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative z-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map tracking"
        />
        {/* Soft gradient overlay so UI elements pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Bottom Panel */}
      <div
        className='h-auto p-6 flex flex-col items-center relative bg-white rounded-t-3xl shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.3)] z-10 cursor-pointer'
        onClick={() => { setFinishRidePanel(true) }}>
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-4"></div>
        <div className="flex w-full items-center justify-between mb-4">
          {/* Fallback to static text if GPS fails, but overlay shows live */}
          <h4 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
            <i className="ri-map-pin-time-fill text-yellow-500 text-2xl"></i>
            {currentDistance ? `${currentDistance} km away` : 'Calculating...'}
          </h4>
        </div>
        <button className='w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-3.5 rounded-xl text-lg shadow-lg'>
          Complete Ride
        </button>
      </div>

      {/* Finish Ride popup Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full bottom-0 bg-white/95 backdrop-blur-xl shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.4)] rounded-t-3xl px-4 py-8 z-30 translate-y-full transition-all duration-300 h-[85vh]">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding