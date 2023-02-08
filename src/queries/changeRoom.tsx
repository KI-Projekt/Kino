import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export interface RoomInput {
    name: string;
    hasThreeD: string;
    hasDolbyAtmos: string;
    numberOfRows: number;
    numberOfColumns: number;
}

export interface RoomUpdate {
    id: number;
    name: string;
    hasThreeD: string;
    hasDolbyAtmos: string;
    seats: Array<{
        id: number,
        seatCategory: string,
    }>;
}

export const postnewRoom = async (newRoom: RoomInput) => {
    const data = await axios(`${PATH}api/rooms`, {
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

export const updateRoom = async (updateRoom: RoomUpdate) => {
    const data = await axios.put(`${PATH}api/rooms/${updateRoom.id}`, updateRoom)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};