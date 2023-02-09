import { PATH } from "./fetchMovieAPI";

export const fetchAllOpeningHours = async () => {
    const url = PATH + "api/openinghours";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};