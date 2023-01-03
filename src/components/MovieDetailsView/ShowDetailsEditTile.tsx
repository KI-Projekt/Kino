import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { Show, ShowDate } from "./ShowTiles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Room } from "../../views/TicketView";
import { Dayjs } from "dayjs";

interface ShowDetailsEditTileProps {
    showData: Array<ShowDate>;
    setShowData: Function;
    roomData: Array<Room>;
}

function ShowDetailsEditTiles(props: ShowDetailsEditTileProps) {

    const theme = useTheme();

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
                                    {currentShow.dateTime.toDateString()} at {currentShow.dateTime.toLocaleTimeString()}
                                </Typography>
                            }
                            <FormControl sx={{ m: theme.spacing(1) }}>
                                <DateTimePicker
                                    label="Show starts at"
                                    value={currentShow.dateTime}
                                    onChange={(newValue: Dayjs | null) => handleChangeDateTime(newValue, currentShow)}
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
                        </>
                    ))
                ))
            }
        </>
    );
}

export default ShowDetailsEditTiles;