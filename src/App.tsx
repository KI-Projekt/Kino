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
import { Box, Container, FormControlLabel, styled, Switch, ThemeProvider, Toolbar, } from "@mui/material";
import type { } from '@mui/x-date-pickers/themeAugmentation';
import OpeningHoursView from "./views/OpeningHoursView";
import TicketPricesView from "./views/TicketPricesView";
import MovieDetailsView from "./views/MovieDetailsView";
import PrivacyPolicyView from "./views/PrivacyPolicyView";
import LoginView from "./views/LoginView";
import PaymentDetailsView from "./views/PaymentDetailsView";
import TicketView from "./views/TicketView";
import AddNewMoviesView from "./views/Admin/AddNewMoviesView";
import OrderFinalisationView from "./views/OrderFinalisationView";
import UserProfileView from "./views/UserProfileView";
import ShowOverviewView from "./views/ShowOverviewView";
import MovieShowDetails from "./views/MovieShowDetails";
import RoomOverviewView from "./views/Admin/RoomOverviewView";
import { AdminProps, Movie, Order, Show, User } from "./interfaces/Interfaces";
import { redTheme } from "./interfaces/Theme";
import backgroundImage from './img/background.jpg';
import { SportsRugbySharp } from "@mui/icons-material";

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

  const appBarProps = {
    open: open,
    handleMenuOpen: () => {
      setOpen(true);
    },
    handleMenuClose: () => {
      setOpen(false);
    },
  };

  const [selectedMovie, setSelectedMovie] = React.useState<Movie | undefined>(
    undefined
  );
  const [selectedShow, setSelectedShow] = React.useState<Show | undefined>(
    undefined
  );
  const [adminProps, setAdminProps] = React.useState<AdminProps>({
    isAdmin: false,
  });

  const [personalDataChanged, setPersonalDataChanged] =
    React.useState<boolean>(false);

  const [order, setOrder] = React.useState<Order | undefined>(undefined);

  const [personalDataFilled, setPersonalDataFilled] = React.useState(false);

  function createUserData(
    userID: number | undefined,
    firstName: string | undefined,
    surname: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    postcode: string | undefined,
    city: string | undefined,
    emailAdress: string | undefined
  ) {
    return {
      userID,
      firstName,
      surname,
      street,
      houseNumber,
      postcode,
      city,
      emailAdress,
    };
  }

  const [user, setUser] = React.useState<User>(
    createUserData(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  );

  const handleChangeAdminMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminProps({
      isAdmin: event.target.checked,
    });
  };

  const [isNew, setIsNew] = React.useState<boolean>(false);

  const [windowWidth, setWindowWidth] = React.useState(0)

  const updateDimensions = () => {
    const windowWidth = window.innerWidth
    setWindowWidth(windowWidth)
  }

  React.useEffect(() => {
    let url = window.location.href;

    let aUrlParts = url.split("/");
    if (aUrlParts[5] === "new") {
      setIsNew(true);
    }

    //Responsibility for Seatplan
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () =>
      window.removeEventListener("resize", updateDimensions);
  }, [])

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header
            appBarProps={appBarProps}
            user={user}
            setUser={setUser}
            setPersonalDataFilled={setPersonalDataFilled}
          />
          <Toolbar />
          <Main open={open} sx={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "100%"}}>
            <Container maxWidth="xl" sx={{backgroundColor: "rgba(255,255,255,0.8)"}}>
                <Box  sx={{ minHeight: "82vh"}}>
                  <Routes>
                    <Route
                      path="/movieDetails/:imdbID"
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
                    <Route
                      path="/showDetails/:imdbID/:showID"
                      element={<TicketView
                        setSelectedMovie={setSelectedMovie}
                        setSelectedShow={setSelectedShow}
                        selectedMovie={selectedMovie}
                        selectedShow={selectedShow}
                        setOrder={setOrder}
                        order={order}
                        user={user}
                        windowWidth={windowWidth}
                      />}
                    />
                    <Route
                      path="/movieDetails/:imdbID/:showID"
                      element={
                        <MovieShowDetails
                          setSelectedMovie={setSelectedMovie}
                          setSelectedShow={setSelectedShow}
                          selectedMovie={selectedMovie}
                          selectedShow={selectedShow}
                        />
                      }
                    />
                    <Route
                      path="/orderDetails/:imdbID/:showID/:orderID"
                      element={
                        <PaymentDetailsView
                          order={order}
                          user={user}
                          setUser={setUser}
                          personalDataFilled={personalDataFilled}
                          setPersonalDataFilled={setPersonalDataFilled}
                          setSelectedMovie={setSelectedMovie}
                          setSelectedShow={setSelectedShow}
                          selectedMovie={selectedMovie}
                          selectedShow={selectedShow}
                          setOrder={setOrder}
                          setPersonalDataChanged={setPersonalDataChanged}
                          personalDataChanged={personalDataChanged}
                        />
                      }
                    />
                    <Route
                      path="/"
                      element={
                        <OverviewView
                          isAdmin={adminProps.isAdmin}
                          isNew={isNew}
                          setIsNew={setIsNew}
                        />
                      }
                    />
                    <Route path="/impressum" element={<ImpressumView />} />
                    <Route path="/contact" element={<ContactUsView />} />
                    <Route path="/about" element={<AboutUsView />} />
                    <Route path="/gettingHere" element={<GettingHereView />} />
                    <Route
                      path="/login"
                      element={<LoginView setUser={setUser} user={user} />}
                    />
                    <Route
                      path="/privacyPolicy"
                      element={<PrivacyPolicyView />}
                    />
                    <Route
                      path="/movieDetails/:imdbID"
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
                    <Route
                      path="/openingHours"
                      element={<OpeningHoursView isAdmin={adminProps.isAdmin} />}
                    />
                    <Route
                      path="/ticketPrices"
                      element={<TicketPricesView isAdmin={adminProps.isAdmin} />}
                    />
                    <Route
                      path="/movieDetails/:imdbID/new"
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
                    <Route
                      path="/addNewMovie"
                      element={
                        <AddNewMoviesView
                          isAdmin={adminProps.isAdmin}
                          isNew={isNew}
                          setIsNew={setIsNew}
                        />
                      }
                    />
                    <Route
                      path="/order/:imdbID/:showID/:orderID"
                      element={
                        <OrderFinalisationView
                          order={order}
                          user={user}
                          setSelectedMovie={setSelectedMovie}
                          setSelectedShow={setSelectedShow}
                          selectedMovie={selectedMovie}
                          selectedShow={selectedShow}
                          setOrder={setOrder}
                        />
                      }
                    />
                    <Route
                      path="/profile/:userID"
                      element={
                        <UserProfileView
                          user={user}
                          personalDataFilled={personalDataFilled}
                          setPersonalDataFilled={setPersonalDataFilled}
                          setUser={setUser}
                          personalUserDataChanged={personalDataChanged}
                          setPersonalUserDataChanged={setPersonalDataChanged}
                        />
                      }
                    />
                    <Route
                      path="/shows"
                      element={<ShowOverviewView isAdmin={adminProps.isAdmin} />}
                    />
                    <Route
                      path="/rooms"
                      element={<RoomOverviewView isAdmin={adminProps.isAdmin} windowWidth={windowWidth} />}
                    />
                  </Routes>
              </Box>
            </Container>
            <Footer user={user} />
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
