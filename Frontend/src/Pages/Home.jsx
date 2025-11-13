import React, { useContext } from 'react'
import LandingPage from '../Components/Landing-Page'
import Hero from '../Components/Hero'
import Banner from '../Components/Banner'
import Page4 from '../Components/Page4'
import MostPopular from '../Components/MostPopular'
import Footer from '../Components/Footer'
import { LanguageContext } from '../context/LanguageContext'

function Home() {
  const { language, setLanguage }  = useContext(LanguageContext)
  return (
    <div className='w-screen min-h-screen bg-[#fdfbfb] overflow-x-hidden'>
            <LandingPage language ={language}/>
            <Hero language ={language}/>
            <Banner language ={language}/>
            <Page4 language ={language}/>
            <MostPopular language ={language}/>
            <Footer language ={language}/>
            
    </div>
  )
}

export default Home