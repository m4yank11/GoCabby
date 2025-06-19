import React, { useActionState, useState, useSyncExternalStore } from 'react'
import logo from '../assets/gocabby-logo.png'
import logo2 from '../assets/logo2.png'
import { Link } from 'react-router-dom'

const userSignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            username: {
                firstName:firstName,
                lastName:lastName,
            },
            email:email,
            password:password
        })

        console.log(userData)
        
        setEmail('')
        setFirstName('')
        setLastName('')
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
                <h3 className='font-medium text-lg mb-2'>Enter your name</h3>
                <div className='flex gap-4 mb-3'>
                    <input
                        required

                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
                        type="text"
                        placeholder='Firstname'
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                    <input
                        required

                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
                        type="text"
                        placeholder='Lastname'
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    />
                </div>
            
                <h3 className='font-medium mb-2 text-lg'>Enter your email</h3>
                <input
                    required

                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-base placeholder:text-base'
                    type="email"
                    placeholder='example@email.com'
                    value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                />

                <h3 className='font-medium text-lg'>Enter Password</h3>
                <input
                    required
                    
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-base'
                    type='password'
                    placeholder='Password'
                    value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                />

                <button
                    className='bg-[#111] text-white mb-1 px-4 py-2 w-full rounded text-lg'>
                    Sign In
                </button>

                <p className='text-center'>Already have an account? <Link to='/userLogin' className='text-blue-600'>Login here</Link></p>
            </form>
        </div>

        {/* Footer with Captain Button */}
        <div>
            <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means by GoCabby to the number provided. </p>
        </div>
        </div>
    )
}

export default userSignUp
