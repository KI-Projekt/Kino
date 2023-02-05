import { Grid, Typography, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Button } from "@mui/material";
import { redTheme } from "../../interfaces/Theme";
import { Room } from "../../interfaces/Interfaces";
import React from "react";
import SaveIcon from '@mui/icons-material/Save';

interface RoomMetadataProps {
    room: Room;
    setRoom: Function;
}

function RoomMetadata(props: RoomMetadataProps) {

    const saveRoom = () => {

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
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            props.setRoom({
                                ...props.room,
                                [e.target.id]: e.target.value,
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                    <FormControlLabel
                        id="hasThreeD"
                        control={<Checkbox defaultChecked={props.room.hasThreeD} />}
                        label="3D"
                        value={props.room.hasThreeD}
                        onChange={() => {
                            props.setRoom({
                                ...props.room,
                                hasThreeD: !props.room.hasThreeD,
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                    <FormControlLabel
                        id="hasDolbyAtmos"
                        control={<Checkbox defaultChecked={props.room.hasDolbyAtmos} />}
                        label="DolbyAtmos"
                        value={props.room.hasDolbyAtmos}
                        onChange={() => {
                            props.setRoom({
                                ...props.room,
                                hasDolbyAtmos: !props.room.hasDolbyAtmos,
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Button
                        variant='contained'
                        startIcon={<SaveIcon />}
                        fullWidth
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