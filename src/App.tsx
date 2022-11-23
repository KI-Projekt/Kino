import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Login from './components/Login';
=======
import Header from './components/Header';
>>>>>>> 3486e82374d4acce2e4d6b0e8ec2cde2097b3942
import OverviewView from './views/OverviewView';

function App() {
  return (
<<<<<<< HEAD
      <BrowserRouter>
        <div>
          <Routes>     
            <Route path="/" element={<OverviewView />} />     
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>      
=======
import Header from './components/Header';
import OverviewView from './views/OverviewView';

function App() {
  return (
    <BrowserRouter>
    <div> 
      <Header></Header>
=======
import Header from './components/Header';
import OverviewView from './views/OverviewView';

function App() {
  return (
    <BrowserRouter>
    <div> 
      <Header></Header>
<<<<<<< HEAD
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
>>>>>>> 571c1b7 (feat: established route and first styles)
=======
>>>>>>> 5b2b057 (feat: header first steps login)
=======
    <BrowserRouter>
    <div> 
      <Header></Header>
>>>>>>> 3486e82374d4acce2e4d6b0e8ec2cde2097b3942
      <Routes>     
        <Route path="/" element={<OverviewView />} />     
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
  </BrowserRouter>      
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1557c76 (feat: established route and first styles)
=======
>>>>>>> 571c1b7 (feat: established route and first styles)
=======
>>>>>>> 3486e82374d4acce2e4d6b0e8ec2cde2097b3942
  );
}

export default App;
