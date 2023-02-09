import axios from "axios";
import { PATH } from "./fetchMovieAPI";

export const updateOrderFares = async (fares: any, orderId: number) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/selectFares`, fares)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const payOrder = async (orderId: number) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/pay`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const cancelOrder = async (orderId: number) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/cancel`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const changePaymentmethod = async (orderId: number) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/selectPaymentMethod`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};