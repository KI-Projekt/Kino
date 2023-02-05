import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import { cancelShow, updateShow } from "../../queries/changeScreenings";
import React from "react";
import Alerts from "../Alerts";
import { Movie, Room, Show, ShowDate } from "../../interfaces/Interfaces";

interface ShowDetailsEditTileProps {
    showData: Array<ShowDate>;
    setShowData: Function;
    roomData: Array<Room>;
    selectedMovie: Movie | undefined;
    getShowsByMovie: Function;
}

function ShowDetailsEditTiles(props: ShowDetailsEditTileProps) {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [showID, setShowID] = React.useState<number | undefined>(undefined);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [alertText, setAlertText] = React.useState("Show was deleted");

    const handleChangeDateTime = (newValue: Dayjs | null, changedShow: Show) => {
        const newShowData = props.showData.map((currentShowDate) => {
            const newShows = currentShowDate.shows.map((currentShow) => {
                if (currentShow.showID === changedShow.showID) {
                    return {
                        ...currentShow,
                        dateTime: newValue?.toDate(),
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


    const onDeleteClick = () => {
        if (showID) {
            cancelShow(showID).then(result => {
                if (result.error) {
                    setAlertText(result.error);
                    setIsError(true);
                } else if (result.errorMessage) {
                    setAlertText(result.errorMessage);
                    setIsError(true);
                } else {
                    setAlertText("Show was deleted successfully!");
                    setIsError(false);
                }
                setAlertOpen(true);;
                setDialogOpen(false);
                props.getShowsByMovie()
            })
        }
    }

    const onUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const TRAILER_ADD = 15;

        props.showData.forEach((currentShowDate) => {
            currentShowDate.shows.forEach((currentShow) => {
                if (currentShow.showID?.toString() === e.currentTarget.id && props.selectedMovie?.runtime && currentShow.dateTime) {
                    let newShow = {
                        movieId: currentShow.movieID,
                        roomId: currentShow.roomID,
                        startDateTime: new Date(currentShow.dateTime),
                        endDateTime: new Date(currentShow.dateTime?.setMinutes(currentShow.dateTime?.getMinutes() + parseInt(props.selectedMovie.runtime) + TRAILER_ADD)),
                        status: "TICKET_SALE_OPEN"
                    }
                    updateShow(newShow, currentShow.showID);
                }
            })
        })
    }

    return (
        <>
            {props.showData.map((currentShowDate: ShowDate) => (
                currentShowDate.shows.map((currentShow: Show) => (
                    currentShow.dateTime &&
                    <>
                        <Divider sx={{ borderBottomWidth: "0.2rem" }} />
                        {
                            typeof currentShow.dateTime === 'object' && currentShow.dateTime !== null && 'toDateString' in currentShow.dateTime &&
                            <Typography
                                sx={{
                                    ml: theme.spacing(1),
                                    my: theme.spacing(1),
                                }}
                                variant="h6"
                            >
                                {currentShow.dateTime.toLocaleDateString()} at {currentShow.dateTime.getHours()}:{currentShow.dateTime.getMinutes() === 0 ? "00" : currentShow.dateTime.getMinutes()}h
                            </Typography>
                        }
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <FormControl sx={{ m: theme.spacing(1) }}>
                                    <DateTimePicker
                                        label="Show starts at"
                                        value={currentShow.dateTime}
                                        onChange={(newValue: Dayjs | null) => handleChangeDateTime(newValue, currentShow)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} xl={4}>
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
                                        {props.roomData.map((room) => (
                                            <MenuItem
                                                value={room.id}
                                            >
                                                {room.name}
                                            </MenuItem>
                                        )
                                        )}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} xl={2}>
                                <Box
                                    sx={{ flexDirection: "row", flexGrow: 1 }}
                                >
                                    <Button startIcon={<DeleteForeverIcon />} id={currentShow.showID?.toString()} onClick={() => { setDialogOpen(true); setShowID(currentShow.showID) }} />
                                    <Button startIcon={<UpdateIcon />} id={currentShow.showID?.toString()} onClick={onUpdateClick} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Dialog
                            fullScreen={fullScreen}
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                Deleting Show
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this Show from our Database?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onDeleteClick} autoFocus startIcon={<DeleteForeverIcon />}>
                                    Delete
                                </Button>
                                <Button autoFocus onClick={() => setDialogOpen(false)} variant="contained">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
                    </>
                ))
            ))
            }
        </>
    );
}


export default ShowDetailsEditTiles;