import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/CaptainLogin')
        }
      } catch (error) {
        console.error("❌ Logout failed:", error.response?.data || error.message)
      }
    }
    logout()
  }, [navigate])

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
