import axios from "axios";
import { fareInput, fareSelection } from "../interfaces/Interfaces";
import { PATH } from "./fetchMovieAPI";

export const postNewFare = async (newFare: fareInput) => {
    const data = await axios.post(`${PATH}api/fareSelection`, newFare)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const changeFare = async (newFare: fareSelection) => {
    const data = await axios.put(`${PATH}api/fareSelection/${newFare.id}`, newFare)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const deleteFare = async (id: number) => {
    const data = await axios.delete(`${PATH}api/fareSelection/${id}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};