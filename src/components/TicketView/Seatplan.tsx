import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import * as React from "react";
import { Row, Seat } from "../../views/PaymentDetailsView";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";

export interface Room {
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
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 2, seatID: "2", booked: false },
    { seatNumber: 3, seatID: "3", booked: false },
    { seatNumber: 4, seatID: "4", booked: false },
    { seatNumber: 5, seatID: "5", booked: false },
    { seatNumber: 6, seatID: "6", booked: false },
    { seatNumber: 7, seatID: "7", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(2, "B", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 10, seatID: "10", booked: false },
    { seatNumber: 11, seatID: "11", booked: false },
    { seatNumber: 12, seatID: "12", booked: false },
    { seatNumber: 13, seatID: "13", booked: false },
    { seatNumber: 14, seatID: "14", booked: false },
    { seatNumber: 15, seatID: "15", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(1, "A", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 2, seatID: "2", booked: false },
    { seatNumber: 3, seatID: "3", booked: false },
    { seatNumber: 4, seatID: "4", booked: false },
    { seatNumber: 5, seatID: "5", booked: false },
    { seatNumber: 6, seatID: "6", booked: false },
    { seatNumber: 7, seatID: "7", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(2, "B", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 10, seatID: "10", booked: false },
    { seatNumber: 11, seatID: "11", booked: false },
    { seatNumber: 12, seatID: "12", booked: false },
    { seatNumber: 13, seatID: "13", booked: false },
    { seatNumber: 14, seatID: "14", booked: false },
    { seatNumber: 15, seatID: "15", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(1, "A", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 2, seatID: "2", booked: false },
    { seatNumber: 3, seatID: "3", booked: false },
    { seatNumber: 4, seatID: "4", booked: false },
    { seatNumber: 5, seatID: "5", booked: false },
    { seatNumber: 6, seatID: "6", booked: false },
    { seatNumber: 7, seatID: "7", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(2, "B", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 10, seatID: "10", booked: false },
    { seatNumber: 11, seatID: "11", booked: false },
    { seatNumber: 12, seatID: "12", booked: false },
    { seatNumber: 13, seatID: "13", booked: false },
    { seatNumber: 14, seatID: "14", booked: false },
    { seatNumber: 15, seatID: "15", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(1, "A", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 2, seatID: "2", booked: false },
    { seatNumber: 3, seatID: "3", booked: false },
    { seatNumber: 4, seatID: "4", booked: false },
    { seatNumber: 5, seatID: "5", booked: false },
    { seatNumber: 6, seatID: "6", booked: false },
    { seatNumber: 7, seatID: "7", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
  createData(2, "B", [
    { seatNumber: null, seatID: null, booked: null },
    { seatNumber: 10, seatID: "10", booked: false },
    { seatNumber: 11, seatID: "11", booked: false },
    { seatNumber: 12, seatID: "12", booked: false },
    { seatNumber: 13, seatID: "13", booked: false },
    { seatNumber: 14, seatID: "14", booked: false },
    { seatNumber: 15, seatID: "15", booked: false },
    { seatNumber: null, seatID: null, booked: null },
  ]),
];

function Seatplan() {
  return (
    <Box
      sx={{
        border: "0.1rem dashed grey",
        maxWidth: "22rem",
        marginLeft: "1rem",
        marginTop: "1rem",
      }}
      alignItems="center"
    >
      <>
        {data.map((row) => (
          <>
            {row.seats.map((seat) => (
              <>
                {seat.seatID && (
                  <IconButton id={seat.seatID}>
                    <EventSeatIcon />
                  </IconButton>
                )}
                {seat.seatID === null && (
                  <IconButton disabled>
                    <StairsOutlinedIcon />
                  </IconButton>
                )}
              </>
            ))}
            <Divider />
          </>
        ))}
        <Divider sx={{ marginBottom: "2rem", marginTop: "1rem" }}>Screen</Divider>
      </>
    </Box>
  );
}

export default Seatplan;
