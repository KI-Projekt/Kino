import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import OverviewView from './views/OverviewView';
import SignUp from './components/SignUp';
import { createTheme, ThemeProvider } from '@mui/material';

export const redTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ED254E',
      contrastText: '#1D1E2A',
    },
    secondary: {
      main: '#1D1E2A',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={redTheme}>
      <BrowserRouter>
        <div>
          <Header></Header>
        </div>
        
          <Routes>
            <Route path="/" element={<OverviewView />} />
            <Route path="/signIn" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
