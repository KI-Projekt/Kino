import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Button, InputAdornment, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieTile from '../components/OverviewView/MovieTile';
import { fetchOMDbAPI } from '../queries/fetchOMDbAPI';

interface AddNewMoviesViewProps {
    isAdmin: boolean,
    isNew: boolean,
    setIsNew: Function,
}

export interface OMDbMovieProps {
    Poster: string,
    imdbID: string,
}

function AddNewMoviesView(props: AddNewMoviesViewProps) {

    const theme = useTheme();

    const [searchInput, setSearchInput] = React.useState<String>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchInput(e.target.value);
    };

    const [movies, setMovies] = useState([])

    const [isError, setIsError] = useState<boolean>(false)

    const handleSubmit = () => {
        fetchOMDbAPI(searchInput).then((result) => {
            if (result.Response === "True")
                setMovies(result.Search);
            else {
                setIsError(true);
                setMovies([]);
            }
        });
    }

    useEffect(() => {
        props.setIsNew(true);
    });

    return (
        <>
            {props.isAdmin &&
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
                        {movies.map((item: OMDbMovieProps) => (
                            <MovieTile picture={item.Poster} id={item.imdbID} isAdmin={props.isAdmin} isNew={props.isNew} />
                        ))}
                        {isError &&
                            <Alert
                                sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }}
                                severity="error"
                            >
                                Search has no results
                            </Alert>
                        }
                    </Box>
                </Box >
            }
            {!props.isAdmin &&
                <Alert
                    sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }}
                    severity="error"
                >
                    You are not allowed to add new movies
                </Alert>
            }
        </>
    );
}

export default AddNewMoviesView;