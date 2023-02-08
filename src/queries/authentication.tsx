import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export interface UserInput {
    firstName: string | undefined,
    lastName: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    zip: string | undefined,
    city: string | undefined,
    email: string | undefined,
    password: string | undefined,
    matchingPassword: string | undefined,
  }

export const registerUser = async (newUser: UserInput) => {
    const data = await axios(`${PATH}api/auth/register`,{
        method: "POST",
        data: newUser,
        withCredentials: true,
    })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const loginUser = async (loginUser: {email: string, password: string}) => {
    const data = await axios(`${PATH}api/auth/login`,{
        method: "POST",
        data: loginUser,
        withCredentials: true,
    })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const getLoggedInUser = async () => {
    const url = PATH + "api/auth";

    const response = await fetch(url, {credentials: "include"});
    const responseJson = await response.json();

    return responseJson;
};