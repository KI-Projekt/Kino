import { PATH } from "./fetchMovieAPI";

export const fetchOrderByID = async (orderId: number) => {
    const url = PATH + `api/orders/${orderId}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};