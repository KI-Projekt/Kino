import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Room, Seat } from "../../interfaces/Interfaces";
import SeatplanEditable from "./SeatplanEditable";
import RoomMetadata from "./RoomMetadata";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface RoomTileProps {
    room: Room
    windowWidth: number;
}

function RoomTile(props: RoomTileProps) {

    function setCategoryOfSelectedSeat(seat: Seat, selectedIndex: number) {
        switch (selectedIndex) {
            case 1:
                return "NORMAL";
            case 2:
                return "PREMIUM";
            case 3:
                return "WHEELCHAIR_ACCESSIBLE";
            case 4:
                return "STAIRS";
        }
        return "";
    }

    function setChangedSeats(seat: Seat, newStatus: string) {
        let exists = false;
        seats.map(currentSeat => {
            if (currentSeat.id === seat.id) {
                exists = true;
                currentSeat.seatCategory = newStatus;
            }
            return currentSeat;
        })
        if (!exists && seat.id)
            seats.push({ id: seat.id, seatCategory: newStatus });
        setSeats(seats);
    }

    function setChangedRoom(seat: Seat, newStatus: string) {
        const newRows = room.rows.map(row => {
            row.seats.map(currentSeat => {
                if (seat.id === currentSeat.id) {
                    seat.category = newStatus;
                }
                return currentSeat;
            })
            return row;
        })
        setRoom({ ...room, rows: newRows });
    }

    function onSeatClick(seat: Seat, selectedIndex: number) {
        let newStatus = setCategoryOfSelectedSeat(seat, selectedIndex);
        setChangedSeats(seat, newStatus);
        setChangedRoom(seat, newStatus);
        setRoomChanged(true);
    }

    const [editMode, setEditMode] = React.useState<boolean>(false);

    const [roomChanged, setRoomChanged] = React.useState<boolean>(false);

    const [room, setRoom] = React.useState<Room>(props.room);

    const [seats, setSeats] = React.useState<Array<{ id: number, seatCategory: string }>>([]);

    return (
        <>
            <Typography sx={{ pt: 3 }} variant="h5">{room.name}</Typography>
            <Box textAlign='end' sx={{ mt: {sm: -3} }}>
                <Button
                    startIcon={editMode ? <ArrowBackIcon /> : <EditIcon />}
                    variant={'contained'}
                    onClick={() => setEditMode(!editMode)}
                    disabled={editMode && roomChanged}
                >
                    {editMode ? "Back" : "Edit"}
                </Button>
            </Box>
            <Grid container spacing={2} alignItems='center' justifyContent='center' sx={{ pt: 3 }}>
                <Grid item xs={12} sm={12} md={6.5} xl={6} sx={{ py: 3 }}>
                    <SeatplanEditable
                        rows={room.rows}
                        onSeatClick={onSeatClick}
                        windowWidth={props.windowWidth}
                        editMode={editMode}
                        roomChanged={roomChanged}
                        setRoomChanged={setRoomChanged}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={5.5} xl={6} sx={{ py: 3 }} textAlign='left' >
                    <RoomMetadata
                        room={room}
                        setRoom={setRoom}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        roomChanged={roomChanged}
                        setRoomChanged={setRoomChanged}
                        seats={seats}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ mt: 3, mb: 3 }} />
        </>
    );
}

export default RoomTile;