import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { drawerWidth } from "./components/Header/Header";
import OverviewView from "./views/OverviewView";
import {
  Box,
  Container,
  createTheme,
  FormControlLabel,
  styled,
  Switch,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import OpeningHoursView from "./views/OpeningHoursView";
import TicketPricesView from "./views/TicketPricesView";
import MovieDetailsView from "./views/MovieDetailsView";
import LoginView from "./views/LoginView";
import FareSelection from "./components/TicketView/FareSelection";
import PaymentDetailsView from "./views/PaymentDetailsView";
import TicketView from "./views/TicketView";
import { Show } from "./components/MovieDetailsView/ShowTiles";

function createData(date: Date, shows: Array<Show>) {
  return { date, shows };
}

export const data = [
  createData(new Date(2023, 0, 1), [
    {
      movieID: "1",
      showID: "1",
      roomID: "1",
      dateTime: new Date(2023, 0, 1, 16, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "5",
      showID: "5",
      roomID: "5",
      dateTime: new Date(2023, 0, 1, 21, 45, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 2), [
    {
      movieID: "2",
      showID: "2",
      roomID: "2",
      dateTime: new Date(2023, 0, 2, 17, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 3), [
    {
      movieID: "3",
      showID: "3",
      roomID: "3",
      dateTime: new Date(2023, 0, 3, 18, 15, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 4), [
    {
      movieID: "4",
      showID: "4",
      roomID: "4",
      dateTime: new Date(2023, 0, 4, 12, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "6",
      showID: "6",
      roomID: "6",
      dateTime: new Date(2023, 0, 4, 16, 15, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "7",
      showID: "7",
      roomID: "7",
      dateTime: new Date(2023, 0, 4, 20, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
];

export interface AdminProps {
  isAdmin: boolean;
}

export interface AdminPropsChange {
  isAdmin: boolean;
  handleChangeAdminMode: Function;
}

export const redTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#1D1E2A",
    },
    primary: {
      main: "#ED254E",
      contrastText: "#1D1E2A",
    },
    secondary: {
      main: "#1D1E2A",
    },
    info: {
      main: "#5C95FF",
    },
    text: {
      primary: "#1D1E2A",
      secondary: "#7F7F7F",
    },
  },
  typography: {
    fontFamily: [
      "Monospace",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}`,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down("sm")]: {
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

  const [adminProps, setAdminProps] = React.useState<AdminProps>({
    isAdmin: false,
  });

  const handleChangeAdminMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminProps({
      isAdmin: event.target.checked,
    });
  };

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header
            open={open}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
          <Toolbar />
          <Main open={open}>
            <Container maxWidth="xl">
              <Box className="App-Box" sx={{ minHeight: "82vh" }}>
                <Routes>
                  <Route
                    path="/"
                    element={<OverviewView isAdmin={adminProps.isAdmin} />}
                  />
                  <Route path="/impressum" element={<ImpressumView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route
                    path="/openingHours"
                    element={<OpeningHoursView isAdmin={adminProps.isAdmin} />}
                  />
                  <Route
                    path="/ticketPrices"
                    element={<TicketPricesView isAdmin={adminProps.isAdmin} />}
                  />
                  <Route
                    path="/movieDetails/:imdbID"
                    element={<MovieDetailsView adminProps={adminProps} showData={data} />}
                  />
                  <Route path="/order" element={<PaymentDetailsView />} />
                  <Route
                    path="/movieDetails/:imdbID/:showID"
                    element={<TicketView />}
                  />

                  {/* //TestComponents */}
                  <Route
                    path="/test/fareSelection"
                    element={<FareSelection totalAmountOfTickets={2} />}
                  />
                </Routes>
              </Box>
            </Container>
            <Footer />
            <FormControlLabel
              control={<Switch onChange={handleChangeAdminMode} />}
              label="Admin"
            />
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
