import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Board from './components/Board.js';
import Contact from './components/Contact.js';
import Teach from './components/Teach.js';
import Gallery from './components/Gallery.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div id="App">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/board/*" element={<Board/>} />
            <Route path="/teach/*" element={<Teach/>} />
            <Route path="/gallery" element={<Gallery/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
  )
}

export default App;
