import { Box, Divider } from "@mui/material";
import { ShowRow } from "../../interfaces/Interfaces";
import ShowSeatIcon from "./ShowSeatIcon";
import LegendSeatplanUser from "./LegendSeatplanUser";

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
                <ShowSeatIcon onSeatClick={props.onSeatClick} seat={seat} windowWidth={props.windowWidth} />
              </>
            ))}
            <Divider />
          </div>
        ))}
        <Divider sx={{ marginBottom: "2rem", marginTop: "1rem" }}>Screen</Divider>
        <LegendSeatplanUser />
      </>
    </Box >
  );
}

export default Seatplan;
