import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Footer from './components/Footer';
import OverviewView from './views/OverviewView';

function App() {
  return (
      <BrowserRouter>
        <div> 
          <nav>
            <ul>
              <li>
                <Link to="/">OverviewView</Link>
              </li>
              <li>
                <Link to="/footerTest">Footer</Link>
              </li>
            </ul>
          </nav>
          <Routes>     
            <Route path="/" element={<OverviewView />} />     
            <Route path="/footerTest" element={<Footer/>} />
          </Routes>
        </div>

      </BrowserRouter>      
  );
}

export default App;
