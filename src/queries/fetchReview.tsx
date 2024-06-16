import { ReviewArrayTags, ReviewStringTags } from "../interfaces/InterfacesReview";
import { PATH } from "./fetchMovieAPI";

export async function getMoviesForReview(userId: number) {
    const response = await fetch(`${PATH}api/movies/${userId}/review`);
    const data = await response.json();
    console.log(data);
    return data;
    }

export async function addReview(review:ReviewArrayTags) {
    const reviewStringTags:ReviewStringTags = tagArrytoString(review);
    const response = await fetch(`${PATH}api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewStringTags),
    });
    return response;
}

export async function addFavoriteGerne(userId: number, genre: string) {
    const response = await fetch(`${PATH}api/favorite-genres/${userId}/${genre}`, {
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



function tagArrytoString(review: ReviewArrayTags): ReviewStringTags {
    let tagString = "";
    review.tags.forEach(tag => {
        tagString += tag + ";";
    });

    return {
        rating: review.rating,
        tags: tagString,
        movieId: review.movieId,
        userId: review.userId
    }
}