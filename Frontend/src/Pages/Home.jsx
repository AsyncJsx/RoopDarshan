import React, { useContext, useEffect, lazy, Suspense } from 'react'
import Footer from '../Components/Footer'
import { LanguageContext } from '../context/LanguageContext'
import axios from '../config/axios'

const LandingPage = lazy(() => import('../Components/Landing-Page'))
const Hero = lazy(() => import('../Components/Hero'))
const Banner = lazy(() => import('../Components/Banner'))
const Page4 = lazy(() => import('../Components/Page4'))
const MostPopular = lazy(() => import('../Components/MostPopular'))

function Home() {
  const { language} = useContext(LanguageContext)

  useEffect(() => {
    axios.get('/awake').catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="w-screen min-h-screen bg-[#fdfbfb] overflow-x-hidden">
      <Suspense fallback={null}>
        <LandingPage language={language} />
        <Hero language={language} />
        <Banner language={language} />
        <Page4 language={language} />
        <MostPopular language={language} />
      </Suspense>

      <Footer language={language} />
    </div>
  )
}

export default Home
