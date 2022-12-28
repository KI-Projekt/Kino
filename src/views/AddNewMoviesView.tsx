import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, Stack, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieTile from '../components/OverviewView/MovieTile';
import { MovieProps } from '../components/OverviewView/Tilebar';
import { fetchOMDbAPI } from '../queries/fetchOMDbAPI';

interface AddNewMovieProps {
    isAdmin: boolean,
    isNew: boolean,
    setIsNew: Function,
}

function AddNewMoviesView(props: AddNewMovieProps) {

    const theme = useTheme();

    const [searchInput, setSearchInput] = React.useState<String>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchInput(e.target.value);
    };

    const [movies, setMovies] = useState([])

    const handleSubmit = () => {
        fetchOMDbAPI(searchInput).then((result) => {
            setMovies(result.Search);
            console.log(result.Search);
        });

    }

    useEffect(() => {
        props.setIsNew(true);
        console.log(`Is New ${props.isNew}`)
    });

    return (
        <Box sx={{ marginX: 2, p: 2, alignItems: 'center' }} textAlign='center' >
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
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ paddingY: theme.spacing(2), ml: theme.spacing(1), mt: theme.spacing(1) }}
            >
                Search
            </Button>
            <Box
                sx={{
                    overflowX: 'auto',
                    flexWrap: 'nowrap',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: theme.spacing(1),
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    {movies.map((item: MovieProps) => (
                        <MovieTile picture={item.Poster} imdbID={item.imdbID} isAdmin={props.isAdmin} isNew={props.isNew} />
                    ))}
                </Stack>
            </Box>
        </Box >
    );
}

export default AddNewMoviesView;