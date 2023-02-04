import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export interface RoomInput{
    name: string;
    hasThreeD: string;
    hasDolbyAtmos: string;
    numberOfRows: number;
    numberOfColumns: number;
}

export const postnewRoom = async (newRoom: RoomInput) => {
    const data = await axios(`${PATH}api/rooms`,{
        method: "POST",
        data: newRoom,
    })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};