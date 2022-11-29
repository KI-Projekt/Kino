import { Link } from '@mui/material';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../styles/OverviewView.css'
import 'bootstrap/dist/css/bootstrap.min.css';


interface MovieProps {
    picture: string,
    imdbID: string,
}

function MovieTile(props: MovieProps) {

    const onMovieTileClick = () => {

    }


    return (
        <div className='image-container d-flex justify-content-start m-3'>
                <Link href={`/movieDetails/${props.imdbID}`} underline='none'>
                    <img src={props.picture} alt="movie" className='Movie-Tile'/>
                </Link>
                <Routes>
                    <Route path={`/movieDetails/${props.imdbID}`} />
                </Routes>
        </div>
    );
}

export default MovieTile;