import * as React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchMovie } from '../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDetailsView() {

    const [selectedMovie, setSelectedMovie] = useState(Object || undefined);

    const getIDFromURL = () => {
        let url = window.location.href;

        let aUrlParts = url.split("/")
        return aUrlParts[4]
    }

    useEffect(() => {
        fetchMovie(getIDFromURL()).then((result) => { setSelectedMovie(result) })
    }, []);

    if (selectedMovie) {
        return (
            <div className='row'>
                <Card sx={{ maxWidth: 345, minWidth: 345, marginLeft: "1rem", marginRight: "2rem", marginBottom: "1rem" }}>
                    <CardMedia
                        component="img"
                        alt="movie poster"
                        image={selectedMovie.Poster}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {selectedMovie.Title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Runtime: {selectedMovie.Runtime} <br />
                            Writer: {selectedMovie.Writer} <br />
                            Cast: {selectedMovie.Actors} <br />
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345, minWidth: 345, maxHeight: 300, marginLeft: "1rem", marginRight: "2rem", overflowY: 'auto' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Synopsis: <br />
                    </Typography>
                    <Typography>
                        {selectedMovie.Plot}
                    </Typography>
                </Card>
            </div>
        );
    }
    else {
        return (<div>

        </div>
        );
    }
}

export default MovieDetailsView;