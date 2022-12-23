import * as React from 'react';
import { Alert, Box, Button, Card, CardContent, CardMedia, Divider, Grid, TextField, Typography, useTheme } from '@mui/material';
import Youtube from 'react-youtube'
import ShowTiles from '../components/MovieDetailsView/ShowTiles';
import { data, MovieDetailsViewProp } from './MovieDetailsView';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function AdminMovieDetailsView(prop: MovieDetailsViewProp) {

    const theme = useTheme();

    const navigate = useNavigate();

    const handleButtonCklick = (
        link: String,
    ) => {
        navigate(`/${link}`);
    };

    return (
        <>
            {prop.selectedMovie &&
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} xl={4} >
                            <Card
                                sx={{
                                    marginLeft: theme.spacing(1),
                                    marginRight: theme.spacing(1),
                                }}
                                elevation={0}
                            >
                                <TextField
                                    id="movie-title"
                                    label="Title"
                                    value={prop.selectedMovie.Title}
                                    sx={{ my: theme.spacing(2) }}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />

                                <CardMedia
                                    component="img"
                                    alt="movie poster"
                                    image={prop.selectedMovie.Poster} />

                                <CardContent>
                                    <TextField
                                        id="movie-runtime"
                                        label="Runtime"
                                        value={prop.selectedMovie.Runtime}
                                        sx={{ my: theme.spacing(1) }}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        id="movie-writer"
                                        label="Writer"
                                        value={prop.selectedMovie.Writer}
                                        sx={{ my: theme.spacing(1) }}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        id="movie-actors"
                                        label="Actors"
                                        value={prop.selectedMovie.Actors}
                                        sx={{ my: theme.spacing(1) }}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        id="movie-genre"
                                        label="Genre"
                                        value={prop.selectedMovie.Genre}
                                        sx={{ my: theme.spacing(1) }}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        id="movie-Rated"
                                        label="Age Rating"
                                        value={prop.selectedMovie.Rated}
                                        sx={{ my: theme.spacing(1) }}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={4} >
                            <Divider orientation="vertical" flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                            <Box sx={{ marginTop: theme.spacing(1) }}>
                                <Card sx={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), marginTop: theme.spacing(10), overflowY: 'auto' }} elevation={0}>

                                    <TextField
                                        id="movie-plot"
                                        label="Plot"
                                        value={prop.selectedMovie.Plot}
                                        sx={{ my: theme.spacing(2) }}
                                        fullWidth
                                        multiline
                                        InputLabelProps={{ shrink: true }}
                                    />

                                </Card>
                                {prop.selectedMovie.trailer &&
                                    <Card
                                        sx={{
                                            marginLeft: theme.spacing(1),
                                            marginRight: theme.spacing(1),
                                            marginTop: theme.spacing(1),
                                        }}
                                        elevation={0}
                                    >
                                        <Youtube videoId={prop.selectedMovie.trailer.key} opts={{ width: "100%", outerHeight: '56.25%' }} />
                                    </Card>}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={4} >
                            <Divider orientation='vertical' flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                            <Box sx={{ marginTop: theme.spacing(1) }}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6} xl={6}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                p: theme.spacing(3),
                                                paddingLeft: theme.spacing(2)
                                            }}
                                        >
                                            Shows
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} xl={6}>
                                        <Box>
                                            <Button
                                                variant='contained'
                                                onClick={() => handleButtonCklick("addNewShow")}
                                                startIcon={<AddIcon />}
                                                sx={{
                                                    m: theme.spacing(3),
                                                }}
                                            >
                                                Add new Show
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <ShowTiles shows={data} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }

            {!prop.selectedMovie && <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">Currently there is no data available</Alert>}
        </>
    );
}

export default AdminMovieDetailsView;