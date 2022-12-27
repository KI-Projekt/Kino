import React, { useEffect, useState } from 'react';
import { fetchOMDbAPI } from '../../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import '../../styles/OverviewView.css'
import { Typography, useTheme } from '@mui/material';
import { AdminProps } from '../../App';

interface MovieProps {
    Poster: string,
    imdbID: string,
}

interface TilebarProps {
    title: string,
    query: string,
    adminProps: AdminProps,
}

function TileBar(props: TilebarProps) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchOMDbAPI(props.query).then((result) => { setMovies(result.Search) })
    }, [props.query]);

    const theme = useTheme();

    return (
        <>
            <Typography variant="h4" sx={{ padding: theme.spacing(1), paddingLeft: theme.spacing(3), paddingTop: theme.spacing(2) }}>{props.title}</Typography>
            <div className='Tile-Bar'>
                {movies.map((item: MovieProps) => (
                    <MovieTile picture={item.Poster} imdbID={item.imdbID} adminProps={props.adminProps} />
                ))}
            </div>
        </>
    );

}
export default TileBar;