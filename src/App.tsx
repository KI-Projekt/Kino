import React from "react";
import './App.css';
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header, { drawerWidth } from './components/Header/Header';
import OverviewView from './views/OverviewView';
import { Box, Container, createTheme, styled, ThemeProvider, Toolbar } from '@mui/material';
import OpeningHoursView from './views/OpeningHoursView';
import TicketPricesView from './views/TicketPricesView';
import MovieDetailsView from './views/MovieDetailsView';
import LoginView from "./views/LoginView";
import PersonalData from "./components/PaymentDetailsView/PersonalData";
import FareSelection from "./components/TicketView/FareSelection";
import Overview from "./components/PaymentDetailsView/OrderOverview";
import PaymentDetailsView from "./views/PaymentDetailsView";

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
    fontFamily: ["Monospace", "Roboto", "Helvetica", "Arial", "sans-serif"].join(','),
  },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}`,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  }),
}));

function App() {
  const [open, setOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header open={open} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose} />
          <Toolbar />
          <Main open={open}>
            <Container maxWidth="xl">
              <Box className='App-Box' sx={{ minHeight: '90vh' }} >
                <Routes>
                  <Route path="/" element={<OverviewView />} />
                  <Route path="/impressum" element={<ImpressumView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/openingHours" element={<OpeningHoursView />} />
                  <Route path="/ticketPrices" element={<TicketPricesView />} />
                  <Route path="/movieDetails/:imdbID" element={<MovieDetailsView />} />
                <Route path="/order" element={<PaymentDetailsView />} />

                {/* //TestComponents */}
                <Route path="/test/personalData" element={<PersonalData />} />
                <Route path="/test/fareSelection" element={<FareSelection totalAmountOfTickets={2}/>} />
              </Routes>
            </Box>
          </Container>
          </Main>
          <Footer />
        </BrowserRouter>
      </ThemeProvider >
    </div>
  );
}

export default App;