import React from 'react'
import Router from './router/Router'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center" />
    <Router/>
    </>
  )
}

export default App