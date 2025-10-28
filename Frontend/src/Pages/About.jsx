import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function About() {
  return (
    <div className='min-h-screen w-full bg-[#151515]'>
      <Navbar/>
      <img src="./about.jpg" className=' w-[50%]' alt="" />
      <Footer/>

    </div>
  )
}

export default About