import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Checkout from './pages/checkout';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/checkout" element={ Checkout } />
    </Routes>
  );
}

export default App;
