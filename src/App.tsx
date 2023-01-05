import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import ContactUsView from "./views/ContactUsView";
import AboutUsView from "./views/AboutUsView";
import GettingHereView from "./views/GettingHereView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { drawerWidth } from "./components/Header/Header";
import OverviewView from "./views/OverviewView";
import { Box, Container, createTheme, FormControlLabel, styled, Switch, ThemeProvider, Toolbar, } from "@mui/material";
import type { } from '@mui/x-date-pickers/themeAugmentation';
import OpeningHoursView from "./views/OpeningHoursView";
import TicketPricesView from "./views/TicketPricesView";
import MovieDetailsView, { Movie } from "./views/MovieDetailsView";
import PrivacyPolicyView from "./views/PrivacyPolicyView";
import LoginView from "./views/LoginView";
import PaymentDetailsView from "./views/PaymentDetailsView";
import TicketView from "./views/TicketView";
import { Show } from "./components/MovieDetailsView/ShowTiles";
import { Order } from "./views/PaymentDetailsView";
import AddNewMoviesView from "./views/Admin/AddNewMoviesView";
import { User } from "./components/PaymentDetailsView/PersonalDataGuestUser";
import OrderFinalisationView from "./views/OrderFinalisationView";

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
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: '#ED254E',
        },
      },
    },
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

  const [selectedMovie, setSelectedMovie] = React.useState<Movie | undefined>(undefined);
  const [selectedShow, setSelectedShow] = React.useState<Show | undefined>(undefined);
  const [adminProps, setAdminProps] = React.useState<AdminProps>({
    isAdmin: false,
  });

  const [order, setOrder] = React.useState<Order | undefined>(undefined);

  function createUserData(
    firstName: string | undefined,
    surname: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    postcode: string | undefined,
    city: string | undefined,
    emailAdress: string | undefined,) {
    return { firstName, surname, street, houseNumber, postcode, city, emailAdress };
  }

  const [user, setUser] = React.useState<User>(
    createUserData(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  )

  const handleChangeAdminMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminProps({
      isAdmin: event.target.checked,
    });
  };

  const [isNew, setIsNew] = React.useState<boolean>(false);

  React.useEffect(() => {
    let url = window.location.href;

    let aUrlParts = url.split("/")
    if (aUrlParts[5] === "new") {
      setIsNew(true)
    }
  }, [])

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header open={open} handleMenuOpen={handleMenuOpen} handleMenuClose={handleMenuClose}
          />
          <Toolbar />
          <Main open={open}>
            <Container maxWidth="xl">
              <Box className="App-Box" sx={{ minHeight: "82vh" }}>
                <Routes>
                  <Route path="/movieDetails/:imdbID"
                    element={<MovieDetailsView
                      setSelectedMovie={setSelectedMovie}
                      setSelectedShow={setSelectedShow}
                      selectedMovie={selectedMovie}
                      isAdmin={adminProps.isAdmin}
                      isNew={isNew}
                      setIsNew={setIsNew}
                    />
                    }
                  />
                  <Route
                    path="/showDetails/:imdbID/:showID"
                    element={<TicketView setSelectedMovie={setSelectedMovie}
                      setSelectedShow={setSelectedShow}
                      selectedMovie={selectedMovie}
                      selectedShow={selectedShow}
                      setOrder={setOrder} />}
                  />
                  <Route
                    path="/orderDetails/:imdbID/:showID/:orderID"
                    element={
                      <PaymentDetailsView
                        order={order}
                        user={user}
                        setUser={setUser}
                        setSelectedMovie={setSelectedMovie}
                        setSelectedShow={setSelectedShow}
                        selectedMovie={selectedMovie}
                        selectedShow={selectedShow}
                        setOrder={setOrder}
                      />}
                  />
                  <Route path="/" element={<OverviewView isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} />} />
                  <Route path="/impressum" element={<ImpressumView />} />
                  <Route path="/contact" element={<ContactUsView />} />
                  <Route path="/about" element={<AboutUsView />} />
                  <Route path="/gettingHere" element={<GettingHereView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route
                    path="/privacyPolicy"
                    element={<PrivacyPolicyView />}
                  />
                  <Route
                    path="/movieDetails/:imdbID"
                    element={<MovieDetailsView setSelectedMovie={setSelectedMovie} setSelectedShow={setSelectedShow} selectedMovie={selectedMovie} isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} />}
                  />
                  <Route path="/openingHours" element={<OpeningHoursView isAdmin={adminProps.isAdmin} />} />
                  <Route path="/ticketPrices" element={<TicketPricesView isAdmin={adminProps.isAdmin} />} />
                  <Route path="/movieDetails/:imdbID/new"
                    element={
                      <MovieDetailsView
                        setSelectedMovie={setSelectedMovie}
                        setSelectedShow={setSelectedShow}
                        selectedMovie={selectedMovie}
                        isAdmin={adminProps.isAdmin}
                        isNew={isNew}
                        setIsNew={setIsNew}
                      />
                    }
                  />
                  <Route path="/addNewMovie" element={<AddNewMoviesView isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} />} />
                  <Route
                    path="/order/:imdbID/:showID/:orderID"
                    element={<OrderFinalisationView
                      order={order}
                      user={user}
                      setSelectedMovie={setSelectedMovie}
                      setSelectedShow={setSelectedShow}
                      selectedMovie={selectedMovie}
                      selectedShow={selectedShow}
                      setOrder={setOrder}
                    />}
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
