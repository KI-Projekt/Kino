import { Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import { Row } from "../../interfaces/Interfaces";
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';
import React from "react";
import { redTheme } from "../../interfaces/Theme";
import Seat from "./Seat";

interface SeatPlanpropsEditable {
  rows: Array<Row>;
  onSeatClick: Function;
  windowWidth: number;
  editMode: boolean;
  roomChanged: boolean;
  setRoomChanged: Function;
}

function SeatplanEditable(props: SeatPlanpropsEditable) {

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function createButtonData(
    index: number,
    label: String,
    icon: JSX.Element,
  ) {
    return { index, label, icon }
  }

  const ButtonData = [
    createButtonData(1, 'Normal', <EventSeatIcon />),
    createButtonData(2, 'Premium', <ChairIcon />),
    createButtonData(3, 'Wheelchair', <AccessibleIcon />),
    createButtonData(4, 'Stairs', <StairsOutlinedIcon />),
  ];

  return (
    <Box
      sx={{
        border: "0.1rem dashed grey",
        marginX: 1,
        marginTop: "1rem",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ pb: 3 }}>
        {props.rows.map((row) => (
          <div style={{ width: "fit-content", margin: "auto", alignItems: "center", justifyContent: "center" }}>
            {row.seats.map((seat) => (
              <>
                <Seat editMode={props.editMode} onSeatClick={props.onSeatClick} seat={seat} windowWidth={props.windowWidth} />
              </>
            ))}
            <Divider />
          </div>
        ))}
        <Divider sx={{ pb: "2rem", pt: "1rem" }}>Screen</Divider>
        <Grid container spacing={3}>
          {ButtonData.map((item) => (
            <Grid item xs={12} sm={6} md={6} xl={3}>
              <Button
                onClick={() => setSelectedIndex(item.index)}
                startIcon={item.icon}
                variant={item.index === selectedIndex ? 'contained': 'outlined'}
                disabled={!props.editMode}
              >
                <Typography sx={{ color: redTheme.palette.primary.contrastText }}>
                  {item.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box >
  );
}

export default SeatplanEditable;
