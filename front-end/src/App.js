import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import CustomerOrders from './pages/customerOrders';
import CustomerOrderDetails from './pages/customerOrderDetails';
import Checkout from './pages/checkout';
import Products from './pages/products';
import SellerOrders from './pages/sellerOrders';
import SellerOrderDetails from './pages/sellerOrderDetails';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
    </Routes>
  );
}

export default App;
