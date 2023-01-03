import { Alert, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Show, ShowDate } from "./ShowTiles";
import React from "react";
import { Movie } from "../../views/MovieDetailsView";
import AddIcon from '@mui/icons-material/Add';

interface ShowDetailsProps {
    showData: Array<ShowDate>,
    setShowData: Function,
    selectedMovie: Movie,
}

function ShowDetails(props: ShowDetailsProps) {

    function createRoomData(
        roomID: string,
        name: string,
    ) {
        return { roomID, name }
    }

    const roomData = [
        createRoomData("1", 'Raum 1'),
        createRoomData("2", 'Audimaxx'),
        createRoomData("3", 'Lidl Saal'),
        createRoomData("4", 'Raum 6'),
    ];

    const handleChangeDateTime = (newValue: Date | null, changedShow: Show) => {
        console.log(newValue);
        const newShowData = props.showData.map((currentShowDate) => {
            const newShows = currentShowDate.shows.map((currentShow) => {
                if (currentShow.showID === changedShow.showID) {
                    return {
                        ...currentShow,
                        dateTime: newValue,
                    };
                } else {
                    return {
                        ...currentShow,
                    }
                }
            });
            return {
                ...currentShowDate,
                shows: newShows,
            }
        });
        props.setShowData(newShowData);
        console.log(props.showData);
    };

    const handleChangeRoom = (e: SelectChangeEvent, changedShow: Show) => {
        const newShowData = props.showData.map((currentShowDate) => {
            const newShows = currentShowDate.shows.map((currentShow) => {
                if (currentShow.showID === changedShow.showID) {
                    return {
                        ...currentShow,
                        roomID: e.target.value,
                    };
                } else {
                    return {
                        ...currentShow,
                    }
                }
            });
            return {
                ...currentShowDate,
                shows: newShows,
            }
        });
        props.setShowData(newShowData);
    };

    const handleAddRoom = (e: SelectChangeEvent) => {
        setAddNewShow(prev => ({
            ...prev,
            roomID: e.target.value,
        }));
    }

    const handleAddDateTime = (newValue: Date | null | undefined) => {
        if (newValue != null) {
            setAddNewShow(prev => ({
                ...prev,
                dateTime: newValue,
            }))
        }
    }

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

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {props.showData &&
                    <Box sx={{ p: theme.spacing(1) }}>
                        <>
                            {props.showData.map((currentShowDate: ShowDate) => (
                                currentShowDate.shows.map((currentShow: Show) => (
                                    currentShow.dateTime &&
                                    <>
                                        <Divider sx={{ borderBottomWidth: "0.2rem" }} />
                                        {typeof currentShow.dateTime === 'object' && currentShow.dateTime !== null && 'toDateString' in currentShow.dateTime &&
                                            <Typography
                                                sx={{
                                                    ml: theme.spacing(1),
                                                    my: theme.spacing(1),
                                                }}
                                            >
                                                {currentShow.dateTime.toDateString()} at {currentShow.dateTime.toLocaleTimeString()}
                                            </Typography>
                                        }
                                        <FormControl sx={{ m: theme.spacing(1) }}>
                                            <DateTimePicker
                                                label="Show starts at"
                                                value={currentShow.dateTime}
                                                onChange={(newValue) => handleChangeDateTime(newValue, currentShow)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </FormControl>
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
                                                value={currentShow.roomID}
                                                onChange={(e) => handleChangeRoom(e, currentShow)}
                                            >
                                                {roomData.map((room) => (
                                                    <MenuItem
                                                        value={room.roomID}
                                                    >
                                                        {room.name}
                                                    </MenuItem>
                                                )
                                                )}

                                            </Select>
                                        </FormControl>
                                    </>
                                ))
                            ))}
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
                                        {roomData.map((room) => (
                                            <MenuItem
                                                value={room.roomID}
                                            >
                                                {room.name}
                                            </MenuItem>
                                        )
                                        )}

                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: theme.spacing(1) }}>
                                    <DateTimePicker
                                        label="Show starts at"
                                        value={addNewShow.dateTime}
                                        onChange={(newValue) => handleAddDateTime(newValue)}
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
                        </>
                    </Box>
                }
                {!props.showData &&
                    <Alert
                        sx={{
                            marginTop: "1rem",
                            width: "90rem",
                            marginLeft: "2rem"
                        }}
                        severity="error"
                    >
                        No show is selected
                    </Alert>
                }
            </LocalizationProvider>
        </>
    );
};

export default ShowDetails;

