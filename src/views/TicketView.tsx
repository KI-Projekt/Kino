import * as React from "react";
import { useState } from "react";
import FareSelection from "../components/TicketView/FareSelection";
import Seatplan from "../components/TicketView/Seatplan";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { getIMDbIDFromURL } from "./MovieDetailsView";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { fetchScreeningByID } from "../queries/fetchScreenings";
import { fetchSpecificMovie } from "../queries/fetchMovieAPI";
import { deleteReservation, postNewReservation } from "../queries/changeReservations";
import { fetchOrderByID } from "../queries/fetchOrder";
import { updateOrderFares } from "../queries/changeOrders";
import { fareSelection, Movie, Order, Show, ShowRow, User } from "../interfaces/Interfaces";
import { fetchAllFares } from "../queries/fetchFares";
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';

export const getShowAfterReload = async () => {
  let url = window.location.href;

  let aUrlParts = url.split("/")
  let showID = aUrlParts[5]

  const response = await fetchScreeningByID(showID).then(show => {
    let currentShow: Show = {
      movieID: show.movie.id,
      movieName: show.movie.posterImage,
      moviePoster: show.movie.title,
      dateTime: new Date(show.startDateTime),
      room: show.room,
      roomID: show.room.id,
      showID: show.id,
      additionalInfo: {
        hasDolbyAtmos: show.room.hasDolbyAtmos,
        isThreeD: show.movie.isThreeD
      },
      seatingPlan: show.seatingPlan
    }
    return currentShow
  })
  return response;
}

export const getMovieAfterReload = async () => {
  let url = window.location.href;

  let aUrlParts = url.split("/")
  let movieID = aUrlParts[4]

  const response = await fetchSpecificMovie(movieID).then(result => {
    return result;
  })
  return response;
}

interface TicketViewProps {
  setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  order: Order | undefined;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  selectedMovie: Movie | undefined;
  setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>;
  selectedShow: Show | undefined;
  user: User | undefined;
  windowWidth: number;
}

function TicketView(props: TicketViewProps) {
  const theme = useTheme();

  const [currentTicketAmmount, setCurrentTicketAmount] = useState(0);
  const [fares, setFares] = useState<Array<fareSelection> | undefined>(undefined);
  const [seats, setSeats] = useState<Array<ShowRow> | undefined>(undefined);

  const setSelectedShow = props.setSelectedShow
  const setSelectedMovie = props.setSelectedMovie

  React.useEffect(() => {
    getShowAfterReload().then(result => {
      setSelectedShow(result);
      initializeSeatingPlan(result.seatingPlan);
    });
    getMovieAfterReload().then(result => setSelectedMovie(result));
    fetchAllFares().then(fares => setFares(fares));
  }, [setSelectedShow, setSelectedMovie]);

  function initializeSeatingPlan(room: any) {
    const newRoom = room.map((currentRow: any) => {
      const newRow = currentRow.row.map((seat: any) => {
        return {
          ...seat,
          selected: false,
        }
      });
      return {
        ...currentRow,
        seats: newRow,
      }
    });
    setSeats(newRoom);
  }

  const navigate = useNavigate();

  const calculatePrice = () => {
    let price = 0;
    fares && fares.forEach((fare) => {
      price += fare.amountOfTickets * fare.price;
    });
    return price;
  };

  const onButtonClick = () => {
    if (props.selectedShow && props.order?.id && fares) {
      let fareQuery = {}
      fares.forEach(fare => {
        fareQuery = {
          ...fareQuery,
          [fare.name]: fare.amountOfTickets
        }
      });
      updateOrderFares(fareQuery, props.order.id);
      navigate(
        `/orderDetails/${getIMDbIDFromURL()}/${props.selectedShow.showID}/${props.order.id}`
      );
    }
  };

  function onSeatClick(e: React.ChangeEvent<HTMLButtonElement>) {
    seats &&
      seats.forEach((row) => {
        row.seats.forEach((seat) => {
          if (seat.seat.id === parseInt(e.currentTarget.id)) {
            if (seat.selected === false) {
              let reservation: any = {
                screeningId: props.selectedShow?.showID,
                seatId: seat.seat.id
              }
              if (props.user?.id) {
                reservation.userId = props.user?.id;
              }
              postNewReservation(reservation).then((result) => {
                fetchOrderByID(result.data.id).then((order) => {
                  props.setOrder(order);
                  const newSeats = seats.map(row => {
                    row.seats.map(seat => {
                      order.tickets.forEach((ticket: any) => {
                        if (ticket.seat.id === seat.seat.id) {
                          seat.selected = true;
                          seat.reserved = false;
                        }
                      });
                      return seat;
                    });
                    return row;
                  });
                  setSeats(newSeats);
                })
              })
              setCurrentTicketAmount(currentTicketAmmount + 1);
            } else {
              props.order?.tickets?.forEach(ticket => {
                if (ticket.seat.id === parseInt(e.currentTarget.id)) {
                  deleteReservation(ticket.id);
                }
              })
              setCurrentTicketAmount(currentTicketAmmount - 1);
            }
            seat.selected = !seat.selected;
          }
        });
        setSeats(seats);
      });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6.5} xl={6}>
        <Box>
          <Typography
            align="center"
            variant="h4"
            sx={{
              p: theme.spacing(3),
              pt: {
                xs: theme.spacing(1),
                sm: theme.spacing(3),
              },
              paddingLeft: theme.spacing,
            }}
          >
            {props.selectedMovie?.title}
          </Typography>
          {props.selectedShow?.dateTime &&
            <Typography
              align="center"
              variant="body1"
              sx={{
                p: theme.spacing(1),
                pt: {
                  xs: theme.spacing(1),
                  sm: theme.spacing(3),
                },
                paddingLeft: theme.spacing,
              }}
            >
              Show on {props.selectedShow?.dateTime.toDateString()} <br />
              {props.selectedShow?.dateTime.getHours()}:{props.selectedShow?.dateTime.getMinutes() === 0 ? "00" : props.selectedShow?.dateTime.getMinutes()}h in {props.selectedShow?.room?.name}
              <br />
              {props.selectedShow.additionalInfo.isThreeD &&
                <Tooltip title='3D'>
                  <ThreeDRotationIcon color='disabled' />
                </Tooltip>
              }
              {props.selectedShow.additionalInfo.hasDolbyAtmos &&
                <Tooltip title='Dolby Atmos'>
                  <SpeakerGroupIcon color='disabled' />
                </Tooltip>
              }
            </Typography>
          }
        </Box>
        {seats &&
          <Seatplan
            data={seats}
            onSeatClick={onSeatClick}
            windowWidth={props.windowWidth} />}
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} xl={6}>
        {fares && <FareSelection
          totalAmountOfTickets={currentTicketAmmount}
          fares={fares}
          setFares={setFares}
          windowWidth={props.windowWidth}
        />}
        <Box>
          <Typography
            align="center"
            variant="h5"
            sx={{
              p: theme.spacing(1),
              pt: {
                xs: theme.spacing(1),
                sm: theme.spacing(3),
              },
              paddingLeft: theme.spacing,
            }}
          >
            Total Price: {calculatePrice()} Euro
          </Typography>
        </Box>
        <Button
          sx={{ width: "100%", marginY: "1rem" }}
          variant="contained"
          onClick={onButtonClick}
          disabled={currentTicketAmmount > 0 ? false : true}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}

export default TicketView;
