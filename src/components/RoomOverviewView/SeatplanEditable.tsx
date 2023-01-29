import { Box, Divider, IconButton } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../interfaces/Interfaces";

interface SeatPlanprops {
  rows: Array<Row>;
  onSeatClick: Function;
  windowWidth: number;
}

function SeatplanEditable(props: SeatPlanprops) {
 
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
        {props.rows.map((row) => (
          <div style={{ width: "fit-content", margin: "auto", alignItems: "center", justifyContent: "center" }}>
            {row.seats.map((seat) => (
              <>
                {seat.id && seat.category !== null && (
                  <IconButton
                    sx={{
                      width: {
                        xs: `${(props.windowWidth / 280)}rem`,
                        sm: `${(props.windowWidth / 280)}rem`,
                        md: `${(props.windowWidth / 540)}rem`,
                        xl: `${(props.windowWidth / 540)}rem`
                      }
                    }}
                    id={seat.id.toString()} onClick={(e) => props.onSeatClick(e)}
                  >
                    <EventSeatIcon id={seat.id.toString()} />
                  </IconButton>
                )}
                {seat.id === null && (
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

export default SeatplanEditable;
