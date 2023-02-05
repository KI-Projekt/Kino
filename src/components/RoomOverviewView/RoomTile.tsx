import { Divider, Grid, Typography } from "@mui/material";
import { Room } from "../../interfaces/Interfaces";
import SeatplanEditable from "./SeatplanEditable";
import RoomMetadata from "./RoomMetadata";
import React from "react";

interface RoomTileProps {
    room: Room
    windowWidth: number;
}

function RoomTile(props: RoomTileProps) {

    function onSeatClick() { }

    const [room, setRoom] = React.useState<Room>(props.room);

    return (
        <>
            <Typography sx={{ pt: 3 }} variant="h5">{room.name}</Typography>
            <Grid container spacing={2} alignItems='center' justifyContent='center' sx={{ pt: 3 }}>
                <Grid item xs={12} sm={12} md={6.5} xl={6} sx={{ py: 3 }}>
                    <SeatplanEditable rows={room.rows} onSeatClick={onSeatClick} windowWidth={props.windowWidth} />
                </Grid>
                <Grid item xs={12} sm={12} md={5.5} xl={6} sx={{ py: 3 }} textAlign='left' >
                    <RoomMetadata room={room} setRoom={setRoom} />
                </Grid>
            </Grid>
            <Divider sx={{ mt: 3, mb: 3 }} />
        </>
    );
}

export default RoomTile;