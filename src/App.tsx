import React from "react";
import './App.css';
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header, { drawerWidth } from './components/Header/Header';
import OverviewView from './views/OverviewView';
import { Box, Container, createTheme, FormControlLabel, styled, Switch, ThemeProvider, Toolbar } from '@mui/material';
import OpeningHoursView from './views/OpeningHoursView';
import TicketPricesView from './views/TicketPricesView';
import MovieDetailsView from './views/MovieDetailsView';
import LoginView from "./views/LoginView";
import FareSelection from "./components/TicketView/FareSelection";
import PaymentDetailsView from "./views/PaymentDetailsView";
import ShowDetailsView from "./views/Admin/ShowDetailsView";

export interface AdminProps {
  isAdmin: boolean,
}

export interface AdminPropsChange {
  isAdmin: boolean,
  handleChangeAdminMode: Function,
}

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
    info: {
      main: '#5C95FF',
    },
    text: {
      primary: '#1D1E2A',
      secondary: '#7F7F7F',
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
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
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

  const [admin, setAdmin] = React.useState<boolean>(false);

  const handleChangeAdminMode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAdmin(
      event.target.checked,
    );
  };

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header open={open} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose} />
          <Toolbar />
          <Main open={open}>
            <Container maxWidth="xl">
              <Box className='App-Box' sx={{ minHeight: '82vh' }} >
                <Routes>
                  <Route path="/" element={<OverviewView isAdmin={admin} />} />
                  <Route path="/impressum" element={<ImpressumView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/openingHours" element={<OpeningHoursView isAdmin={admin} />} />
                  <Route path="/ticketPrices" element={<TicketPricesView isAdmin={admin} />} />
                  <Route path="/movieDetails/:imdbID" element={<MovieDetailsView isAdmin={admin} />} />
                  <Route path="/order" element={<PaymentDetailsView />} />
                  <Route path="/showDetails/:showID" element={<ShowDetailsView isAdmin={admin} />} />

                  {/* //TestComponents */}
                  <Route path="/test/fareSelection" element={<FareSelection totalAmountOfTickets={2} />} />
                </Routes>
              </Box>
            </Container>
            <Footer />
            <FormControlLabel control={<Switch onChange={handleChangeAdminMode} />} label="Admin" />
          </Main>
        </BrowserRouter>
      </ThemeProvider >
    </div>
  );
}

export default App;