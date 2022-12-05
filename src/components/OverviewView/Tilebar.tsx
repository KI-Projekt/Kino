import React, { useEffect, useState } from 'react';
import { fetchOMDbAPI } from '../../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import '../../styles/OverviewView.css'
import { Typography } from '@mui/material';

interface MovieProps {
    Poster: string,
    imdbID: string,
}


interface TilebarProps {
    title: string,
    query: string
}

function TileBar(props: TilebarProps) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchOMDbAPI(props.query).then((result) => { setMovies(result.Search) })
    }, [props.query]);

    return (
        <>
            <Typography variant="h4">{props.title}</Typography>
            <div className='Tile-Bar'>
                {movies.map((item: MovieProps) => (
                    <MovieTile picture={item.Poster} imdbID={item.imdbID} />
                ))}
            </div>
        </>
    );

}
export default TileBar;