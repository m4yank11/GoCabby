import React , {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserLogout = async () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/UserLogin')
        }
    })


    } catch (error) {
        console.error("❌ Logout failed:", error.response?.data || error.message)
    }

  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
