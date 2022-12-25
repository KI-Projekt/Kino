import { Alert, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { AdminProps } from "../../App";

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

function ShowDetailsView(adminProp: AdminProps) {

    const theme = useTheme();

    const [selectedShow, setSelectedShow] = useState<Show>(undefined || Object);

    const getIDFromURL = () => {
        let url = window.location.href;

        let aUrlParts = url.split("/")
        return aUrlParts[4]
    }

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

    return (
        <>
            {adminProp.isAdmin &&
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
                    {/* <Typography>{selectedShow.showID}</Typography>
                    <Typography>{selectedShow.movieID}</Typography> */}
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="show-room">Room</InputLabel>
                        <Select
                            id="show-room"
                            label="Room"
                            // value={selectedShow.roomID}
                            autoWidth
                        >
                            {roomData.map((room) => (
                                <MenuItem>{room.name}</MenuItem>
                            )
                            )}

                        </Select>
                    </FormControl>
                    {/* <Select
                        id="show-room"
                        label="Room"
                        value={selectedShow.roomID}
                        sx={{ my: theme.spacing(2) }}
                    > 
                        {roomData.map((room) => (
                            <MenuItem>{selectedShow.additionalInfo.language}</MenuItem>
                        )
                        )}

                    </Select> */}
                </Box>

            }
            {!adminProp.isAdmin &&
                <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">You don't have access to this site</Alert>
            }
        </>
    );
};

export default ShowDetailsView;

