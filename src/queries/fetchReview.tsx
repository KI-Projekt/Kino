import { Review, UserGerne } from "../interfaces/InterfacesReview";
import { PATH } from "./fetchMovieAPI";

export async function getMoviesForReview(userId: number) {
    const response = await fetch(`${PATH}api/movies/${userId}/review`);
    const data = await response.json();
    return data;
    }

export async function addReview(review:Review) {
    const response = await fetch(`${PATH}api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });
    return response;
}

export async function addFavoriteGernes(userGerne:UserGerne) {
    const response = await fetch(`${PATH}api/favorite-genres/${userGerne.userId}/${userGerne.genre}`, {
        method: "PUT"
    });
    return response;
}

export async function activateAI(userId: number) {
    const response = await fetch(`${PATH}api/users/${userId}/ai`, {
        method: "PUT"
    });
    return  response.status;
}

