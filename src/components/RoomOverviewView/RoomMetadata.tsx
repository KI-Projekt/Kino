import { Grid, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { Room } from "../../interfaces/Interfaces";
import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import { RoomUpdate, updateRoom } from "../../queries/changeRoom";

interface RoomMetadataProps {
    room: Room;
    setRoom: Function;
    editMode: boolean;
    setEditMode: Function;
    roomChanged: boolean;
    setRoomChanged: Function;
    seats: Array<{ id: number, seatCategory: string }>;
}

function RoomMetadata(props: RoomMetadataProps) {

    const saveRoom = () => {
        props.setEditMode(false);
        props.setRoomChanged(false);
        console.log("###", props.seats);

        let updatedRoom: RoomUpdate = {
            id: props.room.id,
            name: props.room.name,
            hasDolbyAtmos: props.room.hasDolbyAtmos.toString(),
            hasThreeD: props.room.hasThreeD.toString(),
            seats: props.seats,
        }

        updateRoom(updatedRoom);
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <TextField
                        type="text"
                        id="name"
                        placeholder="Roomname"
                        label="Roomname"
                        value={props.room?.name}
                        fullWidth
                        disabled={!props.editMode}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            props.setRoom({
                                ...props.room,
                                [e.target.id]: e.target.value,
                            });
                            props.setRoomChanged(true);
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                    <FormControlLabel
                        id="hasThreeD"
                        control={<Checkbox defaultChecked={props.room.hasThreeD} />}
                        label="3D"
                        value={props.room.hasThreeD}
                        disabled={!props.editMode}
                        onChange={() => {
                            props.setRoom({
                                ...props.room,
                                hasThreeD: !props.room.hasThreeD,
                            });
                            props.setRoomChanged(true);
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                    <FormControlLabel
                        id="hasDolbyAtmos"
                        control={<Checkbox defaultChecked={props.room.hasDolbyAtmos} />}
                        label="DolbyAtmos"
                        value={props.room.hasDolbyAtmos}
                        disabled={!props.editMode}
                        onChange={() => {
                            props.setRoom({
                                ...props.room,
                                hasDolbyAtmos: !props.room.hasDolbyAtmos,
                            });
                            props.setRoomChanged(true);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Button
                        variant='contained'
                        startIcon={<SaveIcon />}
                        fullWidth
                        disabled={!props.editMode || !props.roomChanged}
                        onClick={() => saveRoom()}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default RoomMetadata;