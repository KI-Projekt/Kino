import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export interface ReservationInput {
    userId: number | undefined;
    screeningId: number | undefined;
    seatId: number;
}

export const postNewReservation = async (newReservation: ReservationInput) => {
    const data = await axios.post(`${PATH}api/reservations`, newReservation)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const deleteReservation = async (id: number) => {
    const data = await axios.delete(`${PATH}api/reservations/${id}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};