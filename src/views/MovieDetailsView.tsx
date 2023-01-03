import * as React from 'react';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { fetchMovie, fetchTrailerFromTMDb } from '../queries/fetchOMDbAPI';
import { Show } from '../components/MovieDetailsView/ShowTiles';
import AdminMovieDetailsView from '../components/MovieDetailsView/MovieDetailsViewAdmin';
import UserMovieDetailsView from '../components/MovieDetailsView/MovieDetailsViewUser';
import { useNavigate } from 'react-router-dom';
import { fetchSpecificMovie } from '../queries/fetchMovieAPI';

interface MovieDetailsViewProps {
    selectedMovie: Movie | undefined,
    setSelectedMovie: React.Dispatch<Movie>,
    setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>,
    showData: Array<ShowCollection>,
    isAdmin: boolean,
    isNew: boolean,
    setIsNew: Function,
}

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

export interface OMDbMovie {
    id?: number | string | undefined,
    imdbID?: String | undefined
    Title?: String | undefined,
    Poster?: string | undefined,
    Runtime?: String | undefined,
    Writer?: String | undefined,
    Actors?: String | undefined,
    Genre?: String | undefined,
    Rated?: String | undefined,
    Plot?: String | undefined,
    Year?: String | undefined,
    imdbRating?: String | undefined,
    imdbVotes?: String | undefined,
    trailer: TrailerType | undefined,
}

export interface Movie {
    id?: number | undefined,
    imdbId?: String | undefined
    title?: String | undefined,
    posterImage?: string | undefined,
    runtime?: String | undefined,
    writer?: String | undefined,
    actors?: String | undefined,
    genre?: String | undefined,
    rated?: String | undefined,
    plot?: String | undefined,
    releaseYear?: String | undefined,
    imdbRating?: String | undefined,
    imdbVotes?: String | undefined,
    trailer: TrailerType | undefined,
}

export interface ShowCollection {
    date: Date,
    shows: Array<Show>
}

export const getIMDbIDFromURL = () => {
    let url = window.location.href;

    let aUrlParts = url.split("/")
    return aUrlParts[4]
}

function MovieDetailsView(props: MovieDetailsViewProps) {


    const setSelectedMovie = props.setSelectedMovie;

    const navigate = useNavigate();

    const onShowTileClick = (currentShow: Show) => {
        navigate(`/showDetails/${getIMDbIDFromURL()}/${currentShow.showID}`);
        props.setSelectedShow(currentShow);
    }

    useEffect(() => {
        let fetchedMovie: any;

        function appendTrailer(trailers: Array<TrailerType>) {
            trailers.map((item: TrailerType) => {
                let selectedMovie: Movie = {
                    trailer: item.type === "Trailer" ? item : undefined,
                    actors: fetchedMovie.Actors,
                    genre: fetchedMovie.Genre,
                    imdbId: fetchedMovie.imdbID,
                    imdbRating: fetchedMovie.imdbRating,
                    imdbVotes: fetchedMovie.imdbVotes,
                    plot: fetchedMovie.Plot,
                    posterImage: fetchedMovie.Poster,
                    rated: fetchedMovie.Rated,
                    releaseYear: fetchedMovie.Year,
                    runtime: fetchedMovie.Runtime,
                    title: fetchedMovie.Title,
                    writer: fetchedMovie.Writer
                }
                if (props.isNew) {
                    setSelectedMovie(selectedMovie);
                } else {
                    setSelectedMovie({ ...fetchedMovie, trailer: item.type === "Trailer" ? item : undefined })
                }
            })
        }
        if (props.isNew) {
            fetchMovie(getIMDbIDFromURL()).then((result) => {
                fetchedMovie = result;
                fetchTrailerFromTMDb(getIMDbIDFromURL()).then((trailers) => appendTrailer(trailers.results));
            })
        } else {
            fetchSpecificMovie(getIMDbIDFromURL()).then((result) => {
                fetchedMovie = result;
                fetchTrailerFromTMDb(result.imdbId).then((trailers) => appendTrailer(trailers.results));
            })
        }
    }, [setSelectedMovie, props.isNew]);

    return (
        <>
            {!props.isAdmin && props.selectedMovie && <UserMovieDetailsView selectedMovie={props.selectedMovie} setSelectedMovie={props.setSelectedMovie} onShowTileClick={onShowTileClick} showData={props.showData} />}

            {props.isAdmin && props.selectedMovie && <AdminMovieDetailsView selectedMovie={props.selectedMovie} setSelectedMovie={props.setSelectedMovie} onShowTileClick={onShowTileClick} showData={props.showData} isNew={props.isNew} setIsNew={props.setIsNew} />}

            {!props.selectedMovie && <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">Currently there is no data available</Alert>}
        </>
    );
}

export default MovieDetailsView;