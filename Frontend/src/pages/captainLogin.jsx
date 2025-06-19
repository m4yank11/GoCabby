import React, { useState } from 'react'
import logo from '../assets/gocabby-logo.png'
import logo2 from '../assets/logo2.png'
import { Link } from 'react-router-dom'

const captainLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [captainData, setCaptainData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({
            email:email,
            password:password
        })
        console.log(captainData)
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
            <h3 className='font-medium text-lg mb-2'>Enter your email?</h3>
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

            <p className='text-center'>Join a fleet? <Link to='/captainSignUp' className='text-blue-600'>Register as a Captain</Link></p>
            </form>
        </div>

        {/* Footer with User Button */}
        <div>
            <Link to={'/userLogin'}
            className='bg-[#CE732B] flex flex-center justify-center text-white px-4 py-2 w-full rounded text-lg'>
            Sign in as User
            </Link>
        </div>
        </div>
    )
}

export default captainLogin 