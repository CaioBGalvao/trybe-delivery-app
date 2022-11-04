import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import CustomerOrders from './pages/customerOrders';
import CustomerOrderDetails from './pages/customerOrderDetails';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
    </Routes>
  );
}

export default App;
