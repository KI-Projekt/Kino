import { PATH } from "./fetchMovieAPI";

export async function getMoviesForReview() {
    const response = await fetch(`${PATH}/api/movies/review`);

    const data = await response.json();
    return data;
    }