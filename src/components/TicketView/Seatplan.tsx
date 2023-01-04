import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import * as React from "react";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../views/PaymentDetailsView";
import { useTheme } from "@emotion/react";

interface SeatPlanprops {
  data: Array<Row>,
  onSeatClick: Function
}

function Seatplan(props: SeatPlanprops) {

  const theme = useTheme();

  const [windowWidth, setWindowWidth] = React.useState(0)

  React.useEffect(() => {

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () =>
      window.removeEventListener("resize", updateDimensions);
  }, [])

  const updateDimensions = () => {
    const windowWidth = window.innerWidth
    setWindowWidth(windowWidth)
  }

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
          <div style={{ width: "fit-content", margin: "auto", alignItems: "center", justifyContent: "center" }}>
            {row.seats.map((seat) => (
              <>
                {seat.seatID && seat.booked !== null && (
                  <IconButton
                    sx={{ width: { xs: `${(windowWidth / 260)}rem`, sm: `${(windowWidth / 260)}rem`, md: `${(windowWidth / 520)}rem`, xl: `${(windowWidth / 520)}rem` } }}
                    id={seat.seatID} onClick={(e) => props.onSeatClick(e)} color={seat.selected ? "primary" : "secondary"}
                    disabled={seat.booked}
                  >
                    <EventSeatIcon id={seat.seatID} />
                  </IconButton>
                )}
                {seat.seatID === null && (
                  <IconButton disabled sx={{ width: {xs: `${(windowWidth / 260)}rem`, sm: `${(windowWidth / 260)}rem`, md: `${(windowWidth / 520)}rem`, xl: `${(windowWidth / 520)}rem` } }}>
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
    </Box >
  );
}

export default Seatplan;
