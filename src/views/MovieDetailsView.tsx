import * as React from 'react';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchMovie, fetchTrailerFromTMDb } from '../queries/fetchOMDbAPI';
import { Show } from '../components/MovieDetailsView/ShowTiles';
import { AdminProps } from '../App';
import AdminMovieDetailsView from './MovieDetailsViewAdmin';
import UserMovieDetailsView from './MovieDetailsViewUser';

export interface MovieDetailsViewProp {
    selectedMovie: Movie,
    setSelectedMovie: Function,
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

interface Movie {
    Title: String,
    Poster: string,
    Runtime: String,
    Writer: String,
    Actors: String,
    Genre: String,
    Rated: String,
    Plot: String,
    trailer: TrailerType,
}

function createData(
    date: Date,
    shows: Array<Show>
) {
    return { date, shows };
};

export const data = [
    createData(new Date(2023, 0, 1), [{ movieID: "1", showID: "1", roomID: "1", dateTime: new Date(2023, 0, 1, 16, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "5", showID: "5", roomID: "5", dateTime: new Date(2023, 0, 1, 21, 45, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 2), [{ movieID: "2", showID: "2", roomID: "2", dateTime: new Date(2023, 0, 2, 17, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 3), [{ movieID: "3", showID: "3", roomID: "3", dateTime: new Date(2023, 0, 3, 18, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
    createData(new Date(2023, 0, 4), [{ movieID: "4", showID: "4", roomID: "4", dateTime: new Date(2023, 0, 4, 12, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "6", showID: "6", roomID: "6", dateTime: new Date(2023, 0, 4, 16, 15, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }, { movieID: "7", showID: "7", roomID: "7", dateTime: new Date(2023, 0, 4, 20, 30, 0), additionalInfo: { language: "english", isDbox: false, isThreeD: false } }]),
];

function MovieDetailsView(prop: AdminProps) {

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
        <>
            {!prop.isAdmin && selectedMovie && <UserMovieDetailsView selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}

            {prop.isAdmin && selectedMovie && <AdminMovieDetailsView selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}

            {!selectedMovie && <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">Currently there is no data available</Alert>}
        </>
    );
}

export default MovieDetailsView;