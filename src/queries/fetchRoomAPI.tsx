import { PATH } from "./fetchMovieAPI";

export const fetchAllRooms = async () => {
    const url = PATH + "api/rooms";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};