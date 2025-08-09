import React , {useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';


const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext); // Get setUser from context

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("❌ Logout failed:", error.response?.data || error.message);
      } finally {
        // This should run regardless of whether the API call succeeds or fails
        localStorage.removeItem('token');
        setUser(null); // Clear the user state in the context
        navigate('/UserLogin');
      }
    };
    logout();
  }, [navigate, setUser]); // Add dependencies

  // Render null or a loading message while logging out
  return null;
};

export default UserLogout;
