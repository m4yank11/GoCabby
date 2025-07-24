import React, { useState } from 'react'
import logo2 from '../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/userContext'

const UserLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [UserData, setUserData] = useState({})

    const navigate = useNavigate()
    const [user, setUser] = React.useContext(UserDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)

            if (response.status === 200) {
                const data = response.data
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/UserHome')
            }

            } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message)
        }

        setEmail('')
        setPassword('')
        
    }


    return (
        <div className='min-h-screen flex flex-col justify-between p-7'>

        {/* Header with Logo */}
        <div >
            <img className='h-15 w-auto' src={logo2} alt="GoCabby logo" />
        </div>

        {/* Form Section */}
        <div className='-mt-2'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}>
            <h3 className='font-medium text-lg mb-2'>Enter your email</h3>
            <input
                required
                value={email}
                onChange={(e) => 
                    setEmail(e.target.value)
                }

                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-base placeholder:text-base'
                type="email"
                placeholder='example@email.com'
            />

            <h3 className='font-medium text-lg'>Enter Password</h3>
            <input
                required
                value={password}
                onChange={(e) => 
                    setPassword(e.target.value)
                }
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-base'
                type='password'
                placeholder='Password'
            />

            <button
                className='bg-[#111] text-white mb-1 px-4 py-2 w-full rounded text-lg active:scale-95'>
                Login
            </button>

            <p className='text-center'>New here? <Link to='/UserSignUp' className='text-blue-600'>Create new account</Link></p>
            </form>
        </div>

        {/* Footer with Captain Button */}
        <div>
            <Link to={'/CaptainLogin'}
            className='bg-green-600 flex flex-center justify-center text-white px-4 py-2 w-full rounded text-lg'>
            Sign in as Captain
            </Link>
        </div>
        </div>
    )
}

export default UserLogin