import { PATH } from "./fetchMovieAPI";

export const fetchAllRooms = async () => {
    const url = PATH + "api/rooms";

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchSeatplanByRoom = async (roomID: String) => {
    const url = PATH + `api/rooms/${roomID}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};