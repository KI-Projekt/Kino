import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import OverviewView from './views/OverviewView';
import SignUp from './components/SignUp';

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
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Routes>     
            <Route path="/" element={<OverviewView />} />     
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>      
  );
}

export default App;
