import React, { useEffect, useState } from "react";
import RoomTile from "../../components/RoomOverviewView/RoomTile";
import { NewRoom, Room } from "../../interfaces/Interfaces";
import { Alert, Box, Typography } from "@mui/material";
import { fetchAllRooms, fetchSeatplanByRoom } from "../../queries/fetchRoomAPI";
import { postnewRoom, RoomInput } from "../../queries/changeRoom";
import NewRoomAdd from "../../components/RoomOverviewView/NewRoom";

interface RoomOverviewViewProps {
    isAdmin: boolean;
    windowWidth: number;
}

function RoomOverviewView(props: RoomOverviewViewProps) {
    const [rooms, setRooms] = useState<Array<Room> | undefined>(undefined);

    const [reload, setReload] = useState<boolean>(false);


    const [newRoom, setNewRoom] = React.useState<NewRoom>(
        { name: "", hasDolbyAtmos: false, hasThreeD: false, numberOfColumns: 1, numberOfRows: 1 }
    )

    function saveRoom() {
        let postNewRoom: RoomInput = {
            name: newRoom.name,
            hasDolbyAtmos: newRoom.hasDolbyAtmos.toString(),
            hasThreeD: newRoom.hasThreeD.toString(),
            numberOfColumns: newRoom.numberOfColumns,
            numberOfRows: newRoom.numberOfRows
        }
        postnewRoom(postNewRoom).then(() => {
            fetchNewRooms().then((allRooms) => setRooms(allRooms));
        })
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

    async function reloadUseState() {
        await new Promise(f => setTimeout(f, 500));
        setReload(!reload);
    }

    useEffect(() => {
        fetchNewRooms().then((allRooms) => {
            console.log("###", allRooms)
            setRooms(allRooms);
        });
        reloadUseState();
    }, []);

    return (
        <Box sx={{ marginX: 2, p: 2, alignItems: 'center' }} textAlign='center' >
            <Typography variant="h4">Rooms</Typography>
            {props.isAdmin &&
                <>
                    {rooms && rooms.map((currentRoom) =>
                        <>
                            <RoomTile room={currentRoom} windowWidth={props.windowWidth} />
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
        </Box>
    );
}

export default RoomOverviewView;