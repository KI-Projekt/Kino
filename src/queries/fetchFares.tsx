import { PATH } from "./fetchMovieAPI";

export const fetchAllFares = async () => {
    const url = PATH + "api/fareSelection";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};