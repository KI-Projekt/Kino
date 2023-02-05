import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { ShowRow } from "../../interfaces/Interfaces";

interface SeatPlanprops {
  data: Array<ShowRow>;
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
                {seat.seat.id && seat.reserved !== null && (
                  <IconButton
                    sx={{
                      width: {
                        xs: `${(props.windowWidth / 280)}rem`,
                        sm: `${(props.windowWidth / 280)}rem`,
                        md: `${(props.windowWidth / 540)}rem`,
                        xl: `${(props.windowWidth / 540)}rem`
                      }
                    }}
                    id={seat.seat.id.toString()} onClick={(e) => props.onSeatClick(e)} color={seat.selected ? "primary" : "secondary"}
                    disabled={seat.reserved}
                  >
                    <EventSeatIcon id={seat.seat.id.toString()} />
                  </IconButton>
                )}
                {seat.seat.id === null && (
                  <IconButton
                    disabled
                    sx={{
                      width: {
                        xs: `${(props.windowWidth / 290)}rem`,
                        sm: `${(props.windowWidth / 290)}rem`,
                        md: `${(props.windowWidth / 580)}rem`,
                        xl: `${(props.windowWidth / 580)}rem`
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
