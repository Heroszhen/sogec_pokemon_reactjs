import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

//components
import Home from './components/Home/Home';
import Monster from './components/Monster/Monster';
import Test from './components/Test/Test';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monstre/:id" element={<Monster />} />
        <Route path="/test/:id" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
