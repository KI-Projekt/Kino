import React, { useEffect, useState } from 'react';
import { fetchOMDbAPI } from '../../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import '../../styles/OverviewView.css'
import { Typography, useTheme } from '@mui/material';
import { fetchAllMovies } from '../../queries/fetchMovieAPI';

export interface MovieProps {
    posterImage: string,
    id: number | string,
}

interface TilebarProps {
    title: string,
    query?: string,
    isAdmin: boolean,
    isNew: boolean,
}

function TileBar(props: TilebarProps) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        props.query ?
            fetchOMDbAPI(props.query).then((result) => { setMovies(result.Search) })
            :
            fetchAllMovies().then((result) => { setMovies(result) })
    }, [props.query]);

    const theme = useTheme();

    return (
        <>
            <Typography variant="h4" sx={{ padding: theme.spacing(1), paddingLeft: theme.spacing(3), paddingTop: theme.spacing(2) }}>{props.title}</Typography>
            <div className='Tile-Bar'>
                {movies.map((item: MovieProps) => (
                    <MovieTile picture={item.posterImage} id={item.id} isAdmin={props.isAdmin} isNew={props.isNew} />
                ))}
            </div>
        </>
    );

}
export default TileBar;