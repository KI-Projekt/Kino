import { Alert, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

////just for information - can be deleted
export interface Show {
    movieID: string
    showID: string
    roomID: string
    dateTime: Date
    additionalInfo: {
        language: string
        isThreeD: boolean
        isDbox: boolean
    }
}

interface ShowDetailsProps {
    isAdmin: boolean,
    selectedShow?: Show,
    setSelectedShow: Function,
}

function ShowDetailsView(props: ShowDetailsProps) {

    const theme = useTheme();

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
        roomID: number,
        name: String,
    ) {
        return { roomID, name }
    }

    const roomData = [
        createRoomData(1, 'Raum 1'),
        createRoomData(2, 'Audimaxx'),
        createRoomData(3, 'Lidl Saal'),
        createRoomData(4, 'Raum 6'),
    ];

    const handleChangeDateTime = (newValue: Dayjs | null) => {
        const newShow = {
            ...props.selectedShow,
            dateTime: newValue,
        }
        props.setSelectedShow(newShow);
    };

    const handleChangeRoom = (e: SelectChangeEvent) => {
        console.log(e);
        /* const newShow = {
            ...props.selectedShow,
            roomID: 1 //change room id
        }
        props.setSelectedShow(newShow); */
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {props.isAdmin && props.selectedShow &&
                <Box sx={{ p: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            p: theme.spacing(3),
                            paddingLeft: theme.spacing(2)
                        }}
                    >
                        Shows
                    </Typography>
                    <Typography sx={{ ml: 1, mb: 1 }}>ShowID: {props.selectedShow.showID}</Typography>
                    <Typography sx={{ ml: 1, mb: 1 }}>MovieID: {props.selectedShow.movieID}</Typography>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="show-room">Room</InputLabel>
                        <Select
                            id="show-room"
                            label="Room"
                            value={props.selectedShow.roomID}
                            autoWidth
                            onChange={handleChangeRoom}
                        >
                            {roomData.map((room) => (
                                <MenuItem>{room.name}</MenuItem>
                            )
                            )}

                        </Select>
                    </FormControl>
                    <DateTimePicker
                        label="Show starts at"
                        value={props.selectedShow.dateTime}
                        onChange={handleChangeDateTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>

            }
            {props.isAdmin && !props.selectedShow &&
                <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">No show is selected</Alert>
            }
            {!props.isAdmin && props.selectedShow &&
                <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">You don't have access to this site</Alert>
            }
            {!props.isAdmin && !props.selectedShow &&
                <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">You don't have access to this site and no show is selected</Alert>
            }
        </LocalizationProvider>
    );
};

export default ShowDetailsView;

