import axios from "axios";
import { Movie } from "../interfaces/Interfaces";
import { PATH } from "./fetchMovieAPI";

export const postNewMovie = async (newMovie: Movie) => {
    const data = await axios.post(`${PATH}api/movies`, newMovie)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};


export const updateMovie = async (updatedMovie: Movie) => {
    const data = await axios.put(`${PATH}api/movies/${updatedMovie.id}`, updatedMovie)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const deleteMovie = async (id: number | string | undefined) => {
    const data = await axios.delete(`${PATH}api/movies/${id}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};