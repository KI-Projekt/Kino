import { Box, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ShowDate } from "./ShowTiles";
import { Movie } from "../../views/MovieDetailsView";
import ShowDetailsEditTiles from "./ShowDetailsEditTile";
import ShowDetailsAddTile from "./ShowDetailsAddTile";
import { useEffect, useState } from "react";
import { Room } from "../../views/TicketView";
import { fetchAllRooms } from "../../queries/fetchRoomAPI";

interface ShowDetailsProps {
    showData: Array<ShowDate> | undefined,
    setShowData: Function,
    selectedMovie: Movie,
    getShowsByMovie: Function,
}

function ShowDetails(props: ShowDetailsProps) {

    const [roomData, setRoomData] = useState<Array<Room> | undefined>(undefined)

    useEffect(() => {
        fetchAllRooms().then(result => setRoomData(result))
    }, [])

    const theme = useTheme();

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: theme.spacing(1) }}>
                    {roomData &&
                        <>
                            {props.showData &&
                                <ShowDetailsEditTiles roomData={roomData} showData={props.showData} setShowData={props.setShowData} selectedMovie={props.selectedMovie} />
                            }
                            <ShowDetailsAddTile roomData={roomData} selectedMovie={props.selectedMovie} getShowsByMovie={props.getShowsByMovie} />
                        </>
                    }
                </Box>
            </LocalizationProvider>
        </>
    );
};

export default ShowDetails;

