import React from 'react'
import logo from '../assets/gocabby-logo.png'
import logo2 from '../assets/logo2.png'
import bghome from '../assets/bg-home.png'
import bghome2 from '../assets/bg-home-2.png'
import bghome3 from '../assets/bg-home-3.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className="bg-[length:50%_50%] bg-cover bg-center h-screen flex justify-between flex-col  bg-red-400" style={{ backgroundImage: `url(${bghome3})` }}>
            <img className = 'w-30 mt-5 ml-8'src={logo2} alt="GoCabby logo" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h3 className='text-3xl '>Get started with GoCabby</h3>
                <Link to='/userLogin'className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Home
