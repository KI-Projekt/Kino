import { Alert, Box, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ShowDate } from "./ShowTiles";

////just for information - can be deleted
export interface Show {
    movieID: string
    showID: string
    roomID: string
    room: string
    dateTime: Date
    additionalInfo: {
        language: string
        isThreeD: boolean
        isDbox: boolean
    }
}

interface ShowDetailsProps {
    showData: Array<ShowDate>,
    setShowData: Function,
}

function ShowDetails(props: ShowDetailsProps) {

    /* const getIDFromURL = () => {
        let url = window.location.href;

        let aUrlParts = url.split("/")
        return aUrlParts[4]
    } */

    /*  useEffect(() => {
         let fetchShow: Object | undefined;
 
         fetchShow(getIDFromURL()).then((result) => {
             fetchedShow = result;
         })
     }, []); */

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

    /* const handleChangeDateTime = (newValue: Dayjs | null) => {
        const newShow = props.showData.map{
            ...props.showData,
            dateTime: newValue,
        }
        props.set(newShow);
    }; */

    const handleChangeRoom = (e: SelectChangeEvent, changedShow: Show) => {
        console.log(e);
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
        console.log(newShowData);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {props.showData &&
                    <Box sx={{ p: 5 }}>
                        <>
                            {props.showData.map((currentShowDate: ShowDate) => (
                                currentShowDate.shows.map((currentShow: Show) => (
                                    <>
                                        <Divider />
                                        <Typography sx={{ ml: 1, mb: 1 }}>ShowID: {currentShow.showID}</Typography>
                                        <FormControl sx={{ m: 1, minWidth: 80 }}>
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
                                        {/* <DateTimePicker
                                        id="dateTime"
                                            label="Show starts at"
                                            value={currentShow.dateTime}
                                            onChange={handleChangeDateTime}
                                            renderInput={(params) => <TextField {...params} />}
                                        /> */}
                                    </>
                                ))
                            ))}
                        </>
                    </Box>
                }
                {!props.showData &&
                    <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">No show is selected</Alert>
                }
            </LocalizationProvider>
        </>
    );
};

export default ShowDetails;

