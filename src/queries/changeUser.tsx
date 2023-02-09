import axios from "axios";
import { User } from "../interfaces/Interfaces";
import { PATH } from "./fetchMovieAPI";

export const changeUser = async (changedUser: User) => {
    const data = await axios.put(`${PATH}api/users/${changedUser.id}`, changedUser)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};
