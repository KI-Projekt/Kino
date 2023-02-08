import React, { useEffect, useState } from "react";
import RoomTile from "../../components/RoomOverviewView/RoomTile";
import { NewRoom, Room } from "../../interfaces/Interfaces";
import { Alert, Box, Typography } from "@mui/material";
import { fetchAllRooms, fetchSeatplanByRoom } from "../../queries/fetchRoomAPI";
import { postnewRoom, RoomInput } from "../../queries/changeRoom";
import NewRoomAdd from "../../components/RoomOverviewView/NewRoom";
import Alerts from "../../components/Alerts";

interface RoomOverviewViewProps {
    isAdmin: boolean;
    windowWidth: number;
}

function RoomOverviewView(props: RoomOverviewViewProps) {
    const [rooms, setRooms] = useState<Array<Room> | undefined>(undefined);

    const [reload, setReload] = useState<boolean>(false);

    const [newRoom, setNewRoom] = React.useState<NewRoom>(
        { name: "", hasDolbyAtmos: false, hasThreeD: false, numberOfColumns: 1, numberOfRows: 1 }
    );

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");

    function saveRoom() {
        let postNewRoom: RoomInput = {
            name: newRoom.name,
            hasDolbyAtmos: newRoom.hasDolbyAtmos.toString(),
            hasThreeD: newRoom.hasThreeD.toString(),
            numberOfColumns: newRoom.numberOfColumns,
            numberOfRows: newRoom.numberOfRows
        }
        postnewRoom(postNewRoom).then((result) => {
            if (result.error) {
                setAlertText(result.error);
                setIsError(true);
                setAlertOpen(true);
            } else if (result.errorMessage) {
                setAlertText(result.errorMessage);
                setIsError(true);
                setAlertOpen(true);
            } else {
                setAlertText("The room was added successfully!");
                setAlertOpen(true);
                setIsError(false);
                fetchNewRooms().then((allRooms) => setRooms(allRooms));
            }
        });
        reloadUseState();
    };

    async function fetchNewRooms() {
        let roomArray: Array<Room> = [];

        const roomResults = await fetchAllRooms().then(allRooms => {
            allRooms?.forEach((currentRoom: Room) => {
                fetchSeatplanByRoom(currentRoom.id.toString()).then(room => {
                    roomArray.push(room);
                });
            });
            return roomArray;
        });
        return roomResults;
    }

    const reloadUseState = async () => {
        await new Promise(f => setTimeout(f, 500));
        setReload(!reload);
    }

    useEffect(() => {
        fetchNewRooms().then((allRooms) => {
            setRooms(allRooms);
        });

        reloadUseState(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ marginX: 2, py: 2, alignItems: 'center' }} textAlign='center' >
            <Typography variant="h4">Rooms</Typography>
            {props.isAdmin &&
                <>
                    {rooms && rooms.map((currentRoom) =>
                        <>
                            <RoomTile
                                room={currentRoom}
                                windowWidth={props.windowWidth}
                                setAlertOpen={setAlertOpen}
                                setAlertText={setAlertText}
                                setIsError={setIsError}
                            />
                        </>
                    )}
                    <NewRoomAdd newRoom={newRoom} saveRoom={saveRoom} setNewRoom={setNewRoom} />
                </>
            }
            {!props.isAdmin &&
                <Alert
                    sx={{ marginTop: "1rem" }}
                    severity="error"
                >
                    You are not allowed to change the rooms
                </Alert>
            }
            <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
        </Box>
    );
}

export default RoomOverviewView;