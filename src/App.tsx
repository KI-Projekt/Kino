import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
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
                <Link to="/auth">Login</Link>
              </li>
            </ul>
          </nav>
          <Routes>     
            <Route path="/" element={<OverviewView />} />     
            <Route path="/auth" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>      
  );
}

export default App;
