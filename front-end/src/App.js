import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default App;