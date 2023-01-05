import * as React from "react";
import { useState } from "react";
import FareSelection, {
  fareSelection,
} from "../components/TicketView/FareSelection";
import Seatplan from "../components/TicketView/Seatplan";
import "bootstrap/dist/css/bootstrap.min.css";
import { Order, Row, Seat } from "../views/PaymentDetailsView";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { getIMDbIDFromURL, Movie } from "./MovieDetailsView";
import { Show } from "../components/MovieDetailsView/ShowTiles";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { fetchScreeningByID } from "../queries/fetchScreenings";
import { fetchSpecificMovie } from "../queries/fetchMovieAPI";

export interface Room {
  name: string;
  id: number;
  hasThreeD: boolean;
  hasDolbyAtmos: boolean;
  rows: Array<Row>;
}

function createData(
  seatRowID: number,
  rowDescription: String,
  seats: Array<Seat>
) {
  return {
    seatRowID,
    rowDescription,
    seats,
  };
}

const data = [
  createData(1, "A", [
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: null,
      seatRowID: 1,
    },
    {
      seatNumber: 1,
      seatID: "1",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 2,
      seatID: "2",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 3,
      seatID: "3",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 4,
      seatID: "4",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 5,
      seatID: "5",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 6,
      seatID: "6",
      booked: false,
      selected: false,
      seatRowID: 1,
    },
    {
      seatNumber: 7,
      seatID: "7",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: 8,
      seatID: "8",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: 9,
      seatID: "9",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: 10,
      seatID: "10",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: null,
      seatRowID: 1,
    },
  ]),
  createData(2, "B", [
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: null,
      seatRowID: 2,
    },
    {
      seatNumber: 11,
      seatID: "11",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: 12,
      seatID: "12",
      booked: false,
      selected: false,
      seatRowID: 2,
    },
    {
      seatNumber: 13,
      seatID: "13",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 14,
      seatID: "14",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 15,
      seatID: "15",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 16,
      seatID: "16",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 17,
      seatID: "17",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 18,
      seatID: "18",
      booked: false,
      selected: false,
      seatRowID: 3,
    },
    {
      seatNumber: 19,
      seatID: "19",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 20,
      seatID: "20",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: null,
      seatRowID: 2,
    },
  ]),
  createData(3, "C", [
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: null,
      seatRowID: 3,
    },
    {
      seatNumber: 21,
      seatID: "21",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 22,
      seatID: "22",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 23,
      seatID: "23",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 24,
      seatID: "24",
      booked: true,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 25,
      seatID: "25",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 26,
      seatID: "26",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 27,
      seatID: "27",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 28,
      seatID: "28",
      booked: true,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 29,
      seatID: "29",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: 30,
      seatID: "30",
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: false,
      seatRowID: 3,
    },
  ]),
];

export const getShowAfterReload = async () => {
  let url = window.location.href;

  let aUrlParts = url.split("/")
  let showID = aUrlParts[5]

  const response = await fetchScreeningByID(showID).then(show => {
    let currentShow: Show = {
      movieID: show.movie.id,
      dateTime: new Date(show.startDateTime),
      room: show.room.name,
      roomID: show.room.id,
      showID: show.id,
      additionalInfo: {
        hasDolbyAtmos: show.room.hasDolbyAtmos,
        isThreeD: show.movie.isThreeD
      }
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
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  selectedMovie: Movie | undefined;
  setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>;
  selectedShow: Show | undefined;
}

function TicketView(props: TicketViewProps) {
  const theme = useTheme();

  const [currentTicketAmmount, setCurrentTicketAmount] = useState(0);

  const [seats, setSeats] = useState<Array<Row>>(data);

  const newData = data;

  const setSelectedShow = props.setSelectedShow
  const setSelectedMovie = props.setSelectedMovie

  React.useEffect(() => {
    getShowAfterReload().then(result => setSelectedShow(result))
    getMovieAfterReload().then(result => setSelectedMovie(result));
    newData.forEach((row) => {
      row.seats.forEach((seat) => {
        if (seat.selected) {
          seat.selected = false;
        }
      });
    });
    setSeats(newData);
  }, [newData, setSelectedShow, setSelectedMovie]);

  const navigate = useNavigate();

  function createFareData(
    id: number,
    name: string,
    price: number,
    condition: string,
    amountOfTickets: number
  ) {
    return { id, name, price, condition, amountOfTickets };
  }

  const rows = [
    createFareData(
      0,
      "Adults",
      10.0,
      "People older than 16 and younger than 65 years old",
      0
    ),
    createFareData(1, "Kids", 7.0, "Kids under 16 years old", 0),
    createFareData(2, "Students", 8.0, "Students with a student ID", 0),
    createFareData(3, "Pensioner", 9.0, "People older than 65", 0),
  ];

  const [fares, setFares] = useState<Array<fareSelection>>(rows);

  function calculateSelectedSeats() {
    let array: Array<Row> = [];
    seats &&
      seats.forEach((row: Row) => {
        let newRow: Row = { seatRowID: -1, rowDescription: "-1", seats: [] };
        row.seats.forEach((seat) => {
          if (seat.selected) {
            newRow.seats.push(seat);
          }
        });
        if (newRow.seats.length > 0) {
          newRow.seatRowID = row.seatRowID;
          newRow.rowDescription = row.rowDescription;
          array.push(newRow);
        }
      });
    return array;
  }

  const calculatePrice = () => {
    let price = 0;
    fares.forEach((fare) => {
      price += fare.amountOfTickets * fare.price;
    });
    return price;
  };

  const onButtonClick = () => {
    let selectedSeats = calculateSelectedSeats();
    let newOrder = {
      fares: fares,
      movieID: getIMDbIDFromURL(),
      movie: props.selectedMovie?.title,
      orderID: "1",
      picture: props.selectedMovie?.posterImage,
      price: calculatePrice(),
      room: props.selectedShow?.room,
      seats: selectedSeats,
      showDate: props.selectedShow?.dateTime,
      showID: props.selectedShow?.showID,
    };
    props.setOrder(newOrder);
    if (props.selectedShow) {
      navigate(
        `/orderDetails/${getIMDbIDFromURL()}/${props.selectedShow.showID}/${newOrder.orderID
        }`
      );
    }
  };

  function onSeatClick(e: React.ChangeEvent<HTMLButtonElement>) {
    seats &&
      seats.forEach((row) => {
        row.seats.forEach((seat) => {
          if (seat.seatID === e.currentTarget.id) {
            if (seat.selected === false) {
              setCurrentTicketAmount(currentTicketAmmount + 1);
            } else {
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
              {props.selectedShow?.dateTime.getHours()}:{props.selectedShow?.dateTime.getMinutes() === 0 ? "00" : props.selectedShow?.dateTime.getMinutes()}h in {props.selectedShow?.room}
            </Typography>
          }
        </Box>
        {seats && <Seatplan data={seats} onSeatClick={onSeatClick} />}
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} xl={6}>
        <FareSelection
          totalAmountOfTickets={currentTicketAmmount}
          fares={fares}
          setFares={setFares}
        />
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
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}

export default TicketView;
