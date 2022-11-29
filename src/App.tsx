import React from "react";
import './App.css';
import Login from './components/Login';
import OverviewView from './views/OverviewView';
import SignUp from './components/SignUp';
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<OverviewView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;