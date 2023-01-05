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