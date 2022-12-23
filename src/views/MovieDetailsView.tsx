import * as React from 'react';
import { Alert, Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Youtube from 'react-youtube'
import { fetchMovie, fetchTrailerFromTMDb } from '../queries/fetchOMDbAPI';
import ShowTiles, { Show } from '../components/MovieDetailsView/ShowTiles';

interface TrailerType {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: string
    site: string
    size: number
    type: string
}

function createData(
    date: Date,
    shows: Array<Show>
) {
    return { date, shows };
};

const data = [
    createData(new Date(2023, 0, 1), [{ movieID: "1", showID: "1", roomID: "1", dateTime: new Date(2023, 0, 1, 16, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "5", showID: "5", roomID: "5", dateTime: new Date(2023, 0, 1, 21, 45, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 2), [{ movieID: "2", showID: "2", roomID: "2", dateTime: new Date(2023, 0, 2, 17, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 3), [{ movieID: "3", showID: "3", roomID: "3", dateTime: new Date(2023, 0, 3, 18, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 4), [{ movieID: "4", showID: "4", roomID: "4", dateTime: new Date(2023, 0, 4, 12, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "6", showID: "6", roomID: "6", dateTime: new Date(2023, 0, 4, 16, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "7", showID: "7", roomID: "7", dateTime: new Date(2023, 0, 4, 20, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
];

function MovieDetailsView() {

    const [selectedMovie, setSelectedMovie] = useState(undefined || Object);

    const getIDFromURL = () => {
        let url = window.location.href;

        let aUrlParts = url.split("/")
        return aUrlParts[4]
    }

    useEffect(() => {
        let fetchedMovie: Object | undefined;

        function appendTrailer(trailers: Array<TrailerType>) {
            trailers.map((item: TrailerType) => {
                if (item.type === "Trailer") {
                    setSelectedMovie({ ...fetchedMovie, trailer: item });
                    return true;
                } else {
                    setSelectedMovie(fetchedMovie);
                    return false;
                }
            })
        }
        fetchMovie(getIDFromURL()).then((result) => {
            fetchedMovie = result;
            fetchTrailerFromTMDb(getIDFromURL()).then((trailers) => appendTrailer(trailers.results));
        })
    }, []);

    const theme = useTheme();

    return (
        <>
            {selectedMovie &&
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
                                <CardHeader
                                    title={selectedMovie.Title}
                                    titleTypographyProps={{ p: theme.spacing(3), pt: theme.spacing(2), paddingLeft: 0, fontSize: theme.typography.h4.fontSize }}
                                />

                                <CardMedia
                                    component="img"
                                    alt="movie poster"
                                    image={selectedMovie.Poster} />

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Runtime: {selectedMovie.Runtime} <br />
                                        Writer: {selectedMovie.Writer} <br />
                                        Cast: {selectedMovie.Actors} <br />
                                        Genres: {selectedMovie.Genre} <br />
                                        Age Rating: {selectedMovie.Rated} <br />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={4} >
                            <Divider orientation="vertical" flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                            <Box sx={{ marginTop: theme.spacing(1) }}>
                                <Card sx={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), overflowY: 'auto' }} elevation={0}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            p: theme.spacing(3),
                                            pt: {
                                                xs: theme.spacing(1),
                                                sm: theme.spacing(3)
                                            },
                                            paddingLeft: theme.spacing
                                        }}
                                    >
                                        Plot
                                    </Typography>
                                    <Typography sx={{ padding: theme.spacing(1) }}>
                                        {selectedMovie.Plot}
                                    </Typography>
                                </Card>
                                {selectedMovie.trailer &&
                                    <Card
                                        sx={{
                                            marginLeft: theme.spacing(1),
                                            marginRight: theme.spacing(1),
                                            marginTop: theme.spacing(1),
                                        }}
                                        elevation={0}
                                    >
                                        <Youtube videoId={selectedMovie.trailer.key} opts={{ width: "100%", outerHeight: '56.25%' }} />
                                    </Card>}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={4} >
                            <Divider orientation='vertical' flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                            <Box sx={{ marginTop: theme.spacing(1) }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        p: 3,
                                        paddingLeft: theme.spacing
                                    }}
                                >
                                    Shows
                                </Typography>
                                <ShowTiles shows={data} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }

            {!selectedMovie && <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">Currently there is no data available</Alert>}
        </>
    );
}

export default MovieDetailsView;