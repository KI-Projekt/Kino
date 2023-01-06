import { PATH } from "./fetchMovieAPI";

export const fetchAllScreenings = async (date: String) => {
    const url = PATH + `api/screenings?startTime=${date}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchScreeningByID = async (showID: String) => {
    const url = PATH + `api/screenings/${showID}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchAllScreeningsByMovie = async (movieID: String) => {
    const url = PATH + `api/movies/${movieID}/screenings`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};