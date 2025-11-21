import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/admin-login';
import AdminDashboard from '../Pages/Admin-Dashboard';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import SearchPage from '../Pages/Search-Page';
import ProdcutsPage from '../Pages/ProdcutsPage';
import ProductDetial from '../Pages/Product-Detial';
import AdminAuth from '../auth/AdminAuth';
import Add_Product from '../Pages/Add-Product';
import Add_Category from '../Pages/Add-Category';
import Edit_Product from '../Pages/Edit-Product';
import Delete_Product from '../Pages/Delete-Product';
import Edit_Category from '../Pages/Edit-Category';
import Delete_Category from '../Pages/Delete-Category';
import Categories from '../Components/Categories';
import Admin_Categories from '../Components/Admin-Category';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/products' element={<ProdcutsPage/>}/>
        <Route path='/product/:id' element={<ProductDetial/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminAuth><AdminDashboard/></AdminAuth>}/>
        <Route path='/product/add' element ={<AdminAuth><Add_Product/></AdminAuth>} />
        <Route path='/product/edit/:id' element ={<AdminAuth><Edit_Product/></AdminAuth>} />
        <Route path='/product/delete/:id' element ={<AdminAuth><Delete_Product/></AdminAuth>} />
        <Route path='/category/add' element={<AdminAuth> <Add_Category/></AdminAuth>}/>
        <Route path='/category/:id' element ={<AdminAuth><Categories/></AdminAuth>} />
        <Route path='/admin-category/:id' element ={<AdminAuth><Admin_Categories/></AdminAuth>} />
        <Route path='/category/edit/:id' element ={<AdminAuth><Edit_Category/></AdminAuth>} />
        <Route path='/category/delete/:id' element ={<AdminAuth><Delete_Category/></AdminAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
