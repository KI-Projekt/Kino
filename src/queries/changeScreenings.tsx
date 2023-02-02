import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export const postNewShow = async (newShow: any) => {
    const data = await axios.post(`${PATH}api/screenings`, newShow)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const deleteShow = async (id: number) => {
    const data = await axios.delete(`${PATH}api/screenings/${id}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const updateShow = async (updatedShow: any, showID: any) => {
    const data = await axios.put(`${PATH}api/screenings/${showID}`, updatedShow)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};