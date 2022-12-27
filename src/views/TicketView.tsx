import * as React from "react";
import { useState } from "react";
import FareSelection from "../components/TicketView/FareSelection";
import Seatplan from "../components/TicketView/Seatplan";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Seat } from "../views/PaymentDetailsView";
import { Grid } from "@mui/material";

export interface Room {
  roomName: string;
  roomID: number;
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
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: false,
      seatRowID: 3,
    },
  ]),
  createData(4, "D", [
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: false,
      seatRowID: 4,
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
      booked: false,
      selected: false,
      seatRowID: 4,
    },
    {
      seatNumber: null,
      seatID: null,
      booked: null,
      selected: false,
      seatRowID: 4,
    },
  ]),
];

function TicketView() {
  const [currentTicketAmmount, setCurrentTicketAmount] = useState(0);

  function onSeatClick(e: React.ChangeEvent<HTMLButtonElement>) {
    data.forEach((row) => {
      row.seats.forEach((seat) => {
        if (seat.seatID === e.currentTarget.id) {
          if (seat.selected === false) {
            setCurrentTicketAmount(currentTicketAmmount+1)
          } else {
            setCurrentTicketAmount(currentTicketAmmount-1)
          }
          seat.selected = !seat.selected;
        }
      });
    });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8} md={4} xl={3}>
        <Seatplan data={data} onSeatClick={onSeatClick} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} xl={4}>
        <FareSelection totalAmountOfTickets={currentTicketAmmount} />
      </Grid>
    </Grid>
  );
}

export default TicketView;
