import { Box, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ShowDate } from "./ShowTiles";
import { Movie } from "../../views/MovieDetailsView";
import ShowDetailsEditTiles from "./ShowDetailsEditTile";
import { Row } from "../../views/PaymentDetailsView";
import ShowDetailsAddTile from "./ShowDetailsAddTile";

interface ShowDetailsProps {
    showData: Array<ShowDate>,
    setShowData: Function,
    selectedMovie: Movie,
}

function ShowDetails(props: ShowDetailsProps) {

    function createRoomData(
        roomID: number,
        roomName: string,
        rows: Array<Row>,
    ) {
        return { roomID, roomName, rows }
    }

    const roomData = [
        createRoomData(1, 'Raum 1', []),
        createRoomData(2, 'Audimaxx', []),
        createRoomData(3, 'Lidl Saal', []),
        createRoomData(4, 'Raum 6', []),
    ];

    const theme = useTheme();

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: theme.spacing(1) }}>
                    <>
                        {props.showData &&
                            <ShowDetailsEditTiles roomData={roomData} showData={props.showData} setShowData={props.setShowData} />
                        }
                        <ShowDetailsAddTile roomData={roomData} selectedMovie={props.selectedMovie} />
                    </>
                </Box>
            </LocalizationProvider>
        </>
    );
};

export default ShowDetails;

