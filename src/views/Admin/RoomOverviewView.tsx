import React, { useEffect, useState } from "react";
import RoomTile from "../../components/RoomOverviewView/RoomTile";
import { Room } from "../../interfaces/Interfaces";
import { Box, Typography } from "@mui/material";
import { fetchAllRooms, fetchSeatplanByRoom } from "../../queries/fetchRoomAPI";

interface RoomOverviewViewProps {
    isAdmin: boolean;
    windowWidth: number;
}

function RoomOverviewView(props: RoomOverviewViewProps) {
    const [rooms, setRooms] = useState<Array<Room> | undefined>(undefined)

    useEffect(() => {
        let roomArray: Array<Room> = [];
        if (!rooms)
            fetchAllRooms().then(allRooms => {
                allRooms?.forEach((currentRoom: Room) => {
                    fetchSeatplanByRoom(currentRoom.id.toString()).then(room => {
                        roomArray.push(room);
                    });
                });
                setRooms(roomArray);
            });
    });
    return (
        <Box sx={{ marginX: 2, p: 2, alignItems: 'center' }} textAlign='center' >
            <Typography variant="h4">Rooms</Typography>
            {props.isAdmin &&
                <>
                    {rooms?.map((currentRoom) =>
                        <>
                            <RoomTile room={currentRoom} windowWidth={props.windowWidth} />
                        </>
                    )}
                </>
            }
        </Box>
    );
}

export default RoomOverviewView;