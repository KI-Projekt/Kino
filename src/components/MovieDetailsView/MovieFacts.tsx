import { Card, CardContent, CardHeader, CardMedia, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { Movie } from '../../interfaces/Interfaces';

interface MovieFactsProps {
    selectedMovie: Movie,
}

function MovieFacts(props: MovieFactsProps) {

    const theme = useTheme();

    return (
        <Card
            sx={{
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            }}
            elevation={0}
        >
            <CardHeader
                title={props.selectedMovie.title}
                titleTypographyProps={{ p: theme.spacing(3), pt: theme.spacing(2), paddingLeft: 0, fontSize: theme.typography.h4.fontSize }}
            />

            <CardMedia
                component="img"
                alt="movie poster"
                image={props.selectedMovie.posterImage} />

            <CardContent>
                <Typography variant="body2">
                    Runtime: {props.selectedMovie.runtime} <br />
                    Writer: {props.selectedMovie.writer} <br />
                    Director: {props.selectedMovie.director} <br />
                    Cast: {props.selectedMovie.actors} <br />
                    Genres: {props.selectedMovie.genre} <br />
                    Age Rating: {props.selectedMovie.rated} <br />
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MovieFacts;