import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../views/PaymentDetailsView";

interface SeatPlanprops {
  data: Array<Row>;
  onSeatClick: Function;
  windowWidth: number;
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
          <div style={{ width: "fit-content", margin: "auto", alignItems: "center", justifyContent: "center" }}>
            {row.seats.map((seat) => (
              <>
                {seat.seatID && seat.booked !== null && (
                  <IconButton
                    sx={{
                      width: {
                        xs: `${(props.windowWidth / 260)}rem`,
                        sm: `${(props.windowWidth / 260)}rem`,
                        md: `${(props.windowWidth / 520)}rem`,
                        xl: `${(props.windowWidth / 520)}rem`
                      }
                    }}
                    id={seat.seatID} onClick={(e) => props.onSeatClick(e)} color={seat.selected ? "primary" : "secondary"}
                    disabled={seat.booked}
                  >
                    <EventSeatIcon id={seat.seatID} />
                  </IconButton>
                )}
                {seat.seatID === null && (
                  <IconButton
                    disabled
                    sx={{
                      width: {
                        xs: `${(props.windowWidth / 260)}rem`,
                        sm: `${(props.windowWidth / 260)}rem`,
                        md: `${(props.windowWidth / 520)}rem`,
                        xl: `${(props.windowWidth / 520)}rem`
                      }
                    }}
                  >
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
