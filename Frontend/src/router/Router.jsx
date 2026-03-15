import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminAuth from '../auth/AdminAuth';
import VideoGallary from '../Pages/VideoGallary';
import Visible from '../Pages/Visible';
import Cart from '../Pages/Cart';
import ProductVisible from '../Pages/ProductVisible';

const Home = lazy(() => import('../Pages/Home'));
const About = lazy(() => import('../Pages/About'));
const Contact = lazy(() => import('../Pages/Contact'));
const SearchPage = lazy(() => import('../Pages/Search-Page'));
const ProdcutsPage = lazy(() => import('../Pages/ProdcutsPage'));
const ProductDetial = lazy(() => import('../Pages/Product-Detial'));
const AdminLogin = lazy(() => import('../Pages/admin-login'));
const AdminDashboard = lazy(() => import('../Pages/Admin-Dashboard'));
const Add_Product = lazy(() => import('../Pages/Add-Product'));
const Edit_Product = lazy(() => import('../Pages/Edit-Product'));
const Delete_Product = lazy(() => import('../Pages/Delete-Product'));
const Add_Category = lazy(() => import('../Pages/Add-Category'));
const Edit_Category = lazy(() => import('../Pages/Edit-Category'));
const Delete_Category = lazy(() => import('../Pages/Delete-Category'));
const Categories = lazy(() => import('../Components/Categories'));
const Admin_Categories = lazy(() => import('../Components/Admin-Category'));
const Logout = lazy(() => import('../Pages/Logout'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<ProdcutsPage />} />
          <Route path='/gallary' element={<VideoGallary />} />
          <Route path='/product/:id' element={<ProductDetial />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path='/admin/dashboard' element={<AdminAuth><AdminDashboard /></AdminAuth>} />
          <Route path='/product/add' element={<AdminAuth><Add_Product /></AdminAuth>} />
          <Route path='/product/edit/:id' element={<AdminAuth><Edit_Product /></AdminAuth>} />
          <Route path='/product/visible/:id' element={<AdminAuth><ProductVisible /></AdminAuth>} />
          <Route path='/product/delete/:id' element={<AdminAuth><Delete_Product /></AdminAuth>} />
          <Route path='/category/add' element={<AdminAuth><Add_Category /></AdminAuth>} />
          <Route path='/category/:id' element={<Categories />} />
          <Route path='/admin-category/:id' element={<AdminAuth><Admin_Categories /></AdminAuth>} />
          <Route path='/category/edit/:id' element={<AdminAuth><Edit_Category /></AdminAuth>} />
          <Route path='/category/visible/:id' element={<AdminAuth><Visible /></AdminAuth>} />
          <Route path='/category/delete/:id' element={<AdminAuth><Delete_Category /></AdminAuth>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
