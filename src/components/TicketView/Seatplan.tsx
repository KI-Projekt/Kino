import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import * as React from "react";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../views/PaymentDetailsView";

interface SeatPlanprops{
    data: Array<Row>,
    onSeatClick: Function
}

function Seatplan(props: SeatPlanprops) {
  return (
    <Box
      sx={{
        border: "0.1rem dashed grey",
        marginLeft: "1rem",
        marginTop: "1rem",
      }}
      alignItems="center"
      justifyItems="center"
    >
      <>
        {props.data.map((row) => (
          <>
            {row.seats.map((seat) => (
              <>
                {seat.seatID && (
                  <IconButton id={seat.seatID} onClick={(e) => props.onSeatClick(e)}>
                    <EventSeatIcon id={seat.seatID}/>
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
