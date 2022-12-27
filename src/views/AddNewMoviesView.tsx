import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, InputAdornment, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { fetchOMDbAPI } from '../queries/fetchOMDbAPI';

function AddNewMoviesView() {

    const theme = useTheme();

    const [searchInput, setSearchInput] = React.useState<String>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchInput(e.target.value);
    }

    const [movies, setMovies] = useState([])

    const handleSubmit = () => {
        fetchOMDbAPI(searchInput).then((result) => { setMovies(result.Search) });
        console.log(movies);
    }

    return (
        <Box sx={{ marginX: 2, p: 2, alignItems:'center' }} textAlign='center' >
            <TextField
                id="searchInput"
                label="Search for movies"
                value={searchInput}
                sx={{ my: theme.spacing(1) }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={handleTextChange}
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Box >
    );
}

export default AddNewMoviesView;