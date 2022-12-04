import React from "react";
import './App.css';
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OverviewView from './views/OverviewView';
import { Box, Container, createTheme, ThemeProvider, Toolbar } from '@mui/material';
import OpeningHoursView from './views/OpeningHoursView';
import TicketPricesView from './views/TicketPricesView';
import MovieDetailsView from './views/MovieDetailsView';
import LoginView from "./views/LoginView";
import PersonalData from "./components/PaymentDetailsView/PersonalData";

export const redTheme = createTheme({
  
  palette: {
    mode: 'light',
    common: {
    black: '#1D1E2A',
    },
    primary: {
      main: '#ED254E',
      contrastText: '#1D1E2A',
    },
    secondary: {
      main: '#1D1E2A',
    },
    text: {
      primary: '#1D1E2A',
      secondary: '#7F7F7F'
    },
  },
  typography: {
    fontFamily: ["Monospace","Roboto", "Helvetica", "Arial", "sans-serif"].join(','),
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header />
          <Toolbar />
          <Container maxWidth="lg">
            <Box className='App-Box' sx={{ minHeight: '95vh' }} >
              <Routes>
                <Route path="/" element={<OverviewView />} />
                <Route path="/impressum" element={<ImpressumView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/openingHours" element={<OpeningHoursView />} />
                <Route path="/ticketPrices" element={<TicketPricesView />} />
                <Route path="/movieDetails/:imdbID"  element={<MovieDetailsView />}/>

                {/* //TestComponents */}
                <Route path="/test/personalData" element={<PersonalData />} />
              </Routes>
            </Box>
          </Container>
          <Footer />
        </BrowserRouter>
      </ThemeProvider >
    </div>
  );
}

export default App;