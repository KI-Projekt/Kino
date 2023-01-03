import { Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Show } from "./ShowTiles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Room } from "../../views/TicketView";
import React from "react";
import { Movie } from "../../views/MovieDetailsView";
import AddIcon from '@mui/icons-material/Add';
import { Dayjs } from "dayjs";

interface ShowDetailsAddTileProps {
    selectedMovie: Movie;
    roomData: Array<Room>;
}

function ShowDetailsAddTile(props: ShowDetailsAddTileProps) {

    const theme = useTheme();

    const [addNewShow, setAddNewShow] = React.useState<Show>(
        {
            movieID: props.selectedMovie.imdbID,
            showID: undefined,
            roomID: undefined,
            room: undefined,
            dateTime: null,
            additionalInfo: { language: "english", isDbox: false, isThreeD: false },
        }
    );
    function handleAddNewShow() {
        //POST an Show API schicken und dann
    }

    const handleAddRoom = (e: SelectChangeEvent) => {
        setAddNewShow(prev => ({
            ...prev,
            roomID: e.target.value,
        }));
    }

    const handleAddDateTime = (newValue: Dayjs | null | undefined) => {
        if (newValue != null) {
            setAddNewShow(prev => ({
                ...prev,
                dateTime: newValue?.toDate(),
            }))
        }
    }

    return (
        <>
            <Divider sx={{ borderBottomWidth: "0.2rem" }} />
            <Typography
                sx={{
                    ml: theme.spacing(1),
                    my: theme.spacing(1),
                }}
                variant="h6"
            >
                Add new show
            </Typography>
            <FormControl
                sx={{
                    m: theme.spacing(1),
                    width: theme.spacing(15)
                }}
            >
                <InputLabel id="show-room">Room</InputLabel>
                <Select
                    id="roomID"
                    label="Room"
                    value={addNewShow.roomID}
                    onChange={(e) => handleAddRoom(e)}
                >
                    {props.roomData.map((room) => (
                        <MenuItem
                            value={room.roomID}
                        >
                            {room.roomName}
                        </MenuItem>
                    )
                    )}

                </Select>
            </FormControl>
            <FormControl sx={{ m: theme.spacing(1) }}>
                <DateTimePicker
                    label="Show starts at"
                    value={addNewShow.dateTime}
                    onChange={(newValue: Dayjs | null) => handleAddDateTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>
            <Button
                variant="contained"
                fullWidth
                onClick={() => handleAddNewShow()}
                sx={{ my: theme.spacing(2) }}
                startIcon={<AddIcon />}
                disabled={(addNewShow.dateTime && addNewShow.roomID) ? false : true}
            >
                Add Show
            </Button>
        </>
    );
}

export default ShowDetailsAddTile;