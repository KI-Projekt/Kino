export const PATH = "https://api.c930.net/";

export const fetchAllMovies = async () => {
    const url = PATH + "api/movies";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
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