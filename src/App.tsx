import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OverviewView from './views/OverviewView';

function App() {
  return (
    <BrowserRouter>
    <div> 
      <Header></Header>
<<<<<<< HEAD
=======
      <nav>
        <ul>
          <li>
            <Link to="/">OverviewView</Link>
          </li>
          <li>
            <Link to="/header">Header</Link>
          </li>
        </ul>
      </nav>
>>>>>>> a3a3d54 (feat: header first setup)
      <Routes>     
        <Route path="/" element={<OverviewView />} />     
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
  </BrowserRouter>      
  );
}

export default App;
