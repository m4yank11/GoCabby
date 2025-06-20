import React, {useState} from 'react'
import logo2 from '../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignUp = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleType, setVehicleType] = useState('')


    const [captain, setCaptain] = React.useContext(CaptainDataContext)


    const submitHandler = async (e) => {
        e.preventDefault()
        const CaptainData = {
            fullName: {
                firstName:firstName,
                lastName:lastName,
            },
            email:email,
            password:password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                type: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, CaptainData)
        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/CaptainHome')
        } else {
            console.error("❌ Registration failed:", response.data.message || "Unknown error")
        }

        console.log(CaptainData)
        
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleType('')
    }


    return (
        <div className='min-h-screen flex flex-col justify-between px-5 px-5'>

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

                <h3 className='font-medium text-lg mb-2'>Enter Password</h3>
                <input
                    required
                    
                    className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-base placeholder:text-base'
                    type='password'
                    placeholder='Password'
                    value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                />

                <h3 className='font-medium text-lg mb-2'>Vehicle Information</h3>
                <div className='flex gap-4 mb-3'>
                    <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Color'
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                    />
                    <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Plate'
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                    />
                </div>
                <div className='mb-7'>
                    <label className='block font-medium mb-2 text-lg'>Vehicle Type</label>
                    <select
                        required
                        className='bg-[#eeeeee] rounded px-4 py-2 w-full text-base'
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                    >
                        <option value="" disabled>Select vehicle type</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>

                <button
                    className='bg-[#111] text-white mb-1 px-4 py-2 w-full rounded text-lg'>
                    Create Captain Account
                </button>

                <p className='text-center'>Already have an account? <Link to='/CaptainLogin' className='text-blue-600'>Login here</Link></p>
            </form>
        </div>


        <div>
            <p className='text-[10px] leading-tight mb-3'>This site is protected by reCAPTCHA and <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Services apply.</span> </p>
        </div>
        </div>
    )
}

export default CaptainSignUp
