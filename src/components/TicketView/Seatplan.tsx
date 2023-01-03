import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import * as React from "react";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../views/PaymentDetailsView";

interface SeatPlanprops {
  data: Array<Row>,
  onSeatClick: Function
}

function Seatplan(props: SeatPlanprops) {

  return (
    <Box
      sx={{
        border: "0.1rem dashed grey",
        marginX: "1rem",
        marginTop: "1rem",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <>
        {props.data.map((row) => (
          <div style={{ width: "fit-content", margin: "auto" }}>
            {row.seats.map((seat) => (
              <>
                {seat.seatID && seat.booked !== null && (
                  <IconButton sx={{ width: { xs: "1.5rem", sm: "2.5rem", md: "2rem", xl: "3rem" } }} id={seat.seatID} onClick={(e) => props.onSeatClick(e)} color={seat.selected ? "primary" : "secondary"} disabled={seat.booked}>
                    <EventSeatIcon id={seat.seatID} />
                  </IconButton>
                )}
                {seat.seatID === null && (
                  <IconButton disabled sx={{ width: { xs: "1.5rem", sm: "1.5rem", md: "2rem", xl: "3rem" } }}>
                    <StairsOutlinedIcon />
                  </IconButton>
                )}
              </>
            ))}
            <Divider />
          </div>
        ))}
        <Divider sx={{ marginBottom: "2rem", marginTop: "1rem" }}>Screen</Divider>
      </>
    </Box>
  );
}

export default Seatplan;
