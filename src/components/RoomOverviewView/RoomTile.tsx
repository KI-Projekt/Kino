import { Typography } from "@mui/material";
import { Room } from "../../interfaces/Interfaces";
import SeatplanEditable from "./SeatplanEditable";

interface RoomTileProps {
    room: Room
    windowWidth: number;
}

function RoomTile(props: RoomTileProps) {
    function onSeatClick() { }
    return (
        <>
            <Typography>{props.room.name}</Typography>
            <SeatplanEditable rows={props.room.rows} onSeatClick={onSeatClick} windowWidth={props.windowWidth} />
        </>
    );
}

export default RoomTile;