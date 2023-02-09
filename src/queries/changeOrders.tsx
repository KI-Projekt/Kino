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

export const refundOrder = async (orderId: number | undefined) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/refund`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const changePaymentmethod = async (orderId: number | undefined, paymentMethod: string) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/selectPaymentMethod?method=${paymentMethod}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};

export const setUserOnOrder = async (orderId: number | undefined, userId: number | undefined) => {
    const data = await axios.put(`${PATH}api/orders/${orderId}/convertToUser/${userId}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data;
        });

    return data;
};
