import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { redTheme } from "../../interfaces/Theme";
import { NewRoom } from "../../interfaces/Interfaces";
import SaveIcon from '@mui/icons-material/Save';

interface NewRoomProps {
    newRoom: NewRoom;
    setNewRoom: Function;
    saveRoom: Function;
}

function NewRoomAdd(props: NewRoomProps) {

    const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    function changeNewRoomSelectsValues(e: SelectChangeEvent) {
        props.setNewRoom({
            ...props.newRoom,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <>
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
                            value={props.newRoom?.name}
                            fullWidth
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                props.setNewRoom({
                                    ...props.newRoom,
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
                            value={props.newRoom?.hasThreeD}
                            onChange={() => {
                                props.setNewRoom({
                                    ...props.newRoom,
                                    hasThreeD: !props.newRoom.hasThreeD,
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} xl={2}>
                        <FormControlLabel
                            id="hasDolbyAtmos"
                            control={<Checkbox />}
                            label="DolbyAtmos"
                            value={props.newRoom?.hasDolbyAtmos}
                            onChange={() => {
                                props.setNewRoom({
                                    ...props.newRoom,
                                    hasDolbyAtmos: !props.newRoom.hasDolbyAtmos,
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={1.5} xl={2}>
                        <FormControl fullWidth>
                            <InputLabel>Rows</InputLabel>
                            <Select
                                name="numberOfRows"
                                value={props.newRoom.numberOfRows.toString()}
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
                                value={props.newRoom?.numberOfColumns.toString()}
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
                            onClick={() => props.saveRoom()}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default NewRoomAdd;