import React, { useEffect, useState } from "react";
import RoomTile from "../../components/RoomOverviewView/RoomTile";
import { NewRoom, Room } from "../../interfaces/Interfaces";
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { fetchAllRooms, fetchSeatplanByRoom } from "../../queries/fetchRoomAPI";
import { redTheme } from "../../interfaces/Theme";
import SaveIcon from '@mui/icons-material/Save';
import { postnewRoom, RoomInput } from "../../queries/changeRoom";

interface RoomOverviewViewProps {
    isAdmin: boolean;
    windowWidth: number;
}

function RoomOverviewView(props: RoomOverviewViewProps) {
    const [rooms, setRooms] = useState<Array<Room> | undefined>(undefined)

    const [newRoom, setNewRoom] = React.useState<NewRoom>(
        { name: "", hasDolbyAtmos: false, hasThreeD: false, numberOfColumns: 1, numberOfRows: 1 }
    )

    const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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

    function changeNewRoomSelectsValues(e: SelectChangeEvent) {
        setNewRoom({
            ...newRoom,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        if (!rooms)
            fetchNewRooms().then((allRooms) => setRooms(allRooms));
    }, []);

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
                    <Divider />
                    <Box textAlign='left' justifyContent='bottom' sx={{ p: redTheme.spacing(3) }}>
                        <Grid container spacing={3} alignItems='center' justifyContent='center'>
                            <Grid item xs={12} sm={12} md={12} xl={12}>
                                <Typography variant="h5" sx={{ p: redTheme.spacing(2) }}>Add new Room</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} xl={3}>
                                <TextField
                                    type="text"
                                    id="name"
                                    placeholder="Roomname"
                                    label="Roomname"
                                    value={newRoom?.name}
                                    fullWidth
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                        setNewRoom({
                                            ...newRoom,
                                            [e.target.id]: e.target.value,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3} md={1} xl={1}>
                                <FormControlLabel
                                    id="hasThreeD"
                                    control={<Checkbox />}
                                    label="3D"
                                    value={newRoom?.hasThreeD}
                                    onChange={() => {
                                        setNewRoom({
                                            ...newRoom,
                                            hasThreeD: !newRoom.hasThreeD,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3} md={2} xl={2}>
                                <FormControlLabel
                                    id="hasDolbyAtmos"
                                    control={<Checkbox />}
                                    label="DolbyAtmos"
                                    value={newRoom?.hasThreeD}
                                    onChange={() => {
                                        setNewRoom({
                                            ...newRoom,
                                            hasDolbyAtmos: !newRoom.hasDolbyAtmos,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={1.5} xl={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Rows</InputLabel>
                                    <Select
                                        name="numberOfRows"
                                        value={newRoom.numberOfRows.toString()}
                                        label="Colums"
                                        onChange={(e: SelectChangeEvent) => changeNewRoomSelectsValues(e)}
                                    >
                                        {colums.map((item) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} md={1.5} xl={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Colums</InputLabel>
                                    <Select
                                        name="numberOfColumns"
                                        value={newRoom?.numberOfColumns.toString()}
                                        label="Colums"
                                        onChange={(e: SelectChangeEvent) => changeNewRoomSelectsValues(e)}
                                    >
                                        {colums.map((item) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} xl={2}>
                                <Button
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    fullWidth
                                    onClick={() => saveRoom()}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            }
        </Box>
    );
}

export default RoomOverviewView;