import { AiScore } from "../interfaces/InterfacesReview";

export const PATH = "https://cinema-api.mabu2807.de/";
//export const PATH = "http://localhost:8080/";

export const fetchAllMovies = async () => {
    const url = PATH + "api/movies";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchAiMovies = async (userId:number) => {
    const url = PATH + `api/ai-scores/${userId}`;

    const response = await fetch(url);
    if (response.status === 200) {
    const responseJson = await response.json();
    return responseJson as AiScore;
    } else {

    }
};

export const fetchMoviesByAgeRating = async (rated: string) => {
    const url = PATH + `api/movies?rated=${rated}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchMoviesWithGenre = async (searchValue: String) => {
    const url = PATH + `api/movies?genre=${searchValue}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchMoviesByIMDbID = async (searchValue: String) => {
    const url = PATH + `api/movies?imdbId=${searchValue}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchSpecificMovie = async (searchValue: String) => {
    const url = PATH + `api/movies/${searchValue}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchAllArchivedMovies = async () => {
    const url = PATH + "api/movies?page=0&size=10&sort=id%2CASC&status=ARCHIVED";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};
