import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/admin-login';
import AdminDashboard from '../Pages/admin-dashboard';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
