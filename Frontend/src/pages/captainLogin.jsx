import React, { useState, useContext } from 'react'
import logo2 from '../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    const navigate = useNavigate()
    const {setCaptain} = useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const CaptainData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, CaptainData)

            if (response.status === 200) {
                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/CaptainHome')
            }

            } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message)
        }

        // setEmail('')
        // setPassword('')
            
        
        
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
                className='bg-[#111] text-white mb-1 px-4 py-2 w-full rounded text-lg'>
                Login
            </button>

            <p className='text-center'>Join a fleet? <Link to='/CaptainSignUp' className='text-blue-600'>Register as a Captain</Link></p>
            </form>
        </div>

        {/* Footer with User Button */}
        <div>
            <Link to={'/UserLogin'}
            className='bg-[#CE732B] flex flex-center justify-center text-white px-4 py-2 w-full rounded text-lg'>
            Sign in as User
            </Link>
        </div>
        </div>
    )
}

export default CaptainLogin 