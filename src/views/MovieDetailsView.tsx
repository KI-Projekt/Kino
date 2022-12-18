import * as React from 'react';
import { Alert, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Youtube from 'react-youtube'
import { fetchMovie, fetchTrailerFromTMDb } from '../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    createData(new Date(2023, 0, 1), [{ showID: "1", roomID: "1", dateTime: new Date(2023, 0, 1, 16, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { showID: "1", roomID: "1", dateTime: new Date(2023, 0, 1, 21, 45, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 2), [{ showID: "1", roomID: "1", dateTime: new Date(2023, 0, 2, 17, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 3), [{ showID: "1", roomID: "1", dateTime: new Date(2023, 0, 3, 18, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 4), [{ showID: "1", roomID: "1", dateTime: new Date(2023, 0, 4, 12, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { showID: "1", roomID: "1", dateTime: new Date(2023, 0, 4, 16, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { showID: "1", roomID: "1", dateTime: new Date(2023, 0, 4, 20, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
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

    return (
        <div className='row'>
            {selectedMovie &&
                <>
                    <Card sx={{ maxWidth: "25rem", minWidth: "18rem", marginLeft: "1rem", marginRight: "1rem", marginBottom: "2rem", marginTop: "1rem" }}>
                        <CardMedia
                            component="img"
                            alt="movie poster"
                            image={selectedMovie.Poster} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {selectedMovie.Title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Runtime: {selectedMovie.Runtime} <br />
                                Writer: {selectedMovie.Writer} <br />
                                Cast: {selectedMovie.Actors} <br />
                                Genres: {selectedMovie.Genre} <br />
                                Age Rating: {selectedMovie.Rated} <br />
                            </Typography>
                        </CardContent>
                    </Card><Box sx={{ maxWidth: "25rem", minWidth: "16rem", marginTop: "1rem" }}>
                        <Card sx={{ maxWidth: "25rem", minWidth: "18rem", maxHeight: "26rem", marginLeft: "1rem", marginRight: "1rem", overflowY: 'auto' }}>
                            <Typography variant='h6' sx={{ padding: "1rem" }}>
                                Plot:
                            </Typography>
                            <Typography sx={{ padding: "1rem" }}>
                                {selectedMovie.Plot}
                            </Typography>
                        </Card>
                        {selectedMovie.trailer &&
                            <Card sx={{ maxWidth: "25rem", minWidth: "18rem", maxHeight: "23rem", marginLeft: "1rem", marginRight: "1rem", overflowY: 'auto', marginTop: "1rem" }}>
                                <Youtube videoId={selectedMovie.trailer.key} opts={{ width: "100%" }} />
                            </Card>}
                    </Box>
                    <ShowTiles shows={data} />
                </>
            }
            {!selectedMovie && <Alert sx={{marginTop: "1rem", width: "90rem", marginLeft: "2rem"}} severity="error">Currently there is no data available</Alert>}
        </div>
    );
}

export default MovieDetailsView;