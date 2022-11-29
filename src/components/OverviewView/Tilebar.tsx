import React, { Component, useEffect, useState } from 'react';
import { fetchOMDbAPI } from '../../queries/fetchOMDbAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import '../../styles/OverviewView.css'

interface MovieProps {
    Poster: string,
    imdbID: string,
}


function TileBar() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchOMDbAPI("Star Wars").then((result) => { setMovies(result.Search) })
    }, []);

    return (
        <div className='Tile-Bar'>
                {movies.map((item: MovieProps) => (
                    <MovieTile picture={item.Poster} imdbID={item.imdbID}/>
                ))}
        </div>
    );

}
export default TileBar;