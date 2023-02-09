import axios from "axios";
import { OpeningHourDay } from "../interfaces/Interfaces";
import { PATH } from "./fetchMovieAPI";

export const changeOpeningHour = async (newOpeningHour: OpeningHourDay) => {
    let putOpeningHour = {
        openingTime: newOpeningHour.openingtime,
        closingTime: newOpeningHour.closingtime
    }
    const data = await axios.put(`${PATH}api/openinghours/${newOpeningHour.id}`, putOpeningHour)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};