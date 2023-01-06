import axios from 'axios'

export const fetchOMDbAPI = async (searchValue: String) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=5e74c3a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchMovie = async (id: String) => {
    const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=5e74c3a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
}

export const fetchTrailerFromTMDb = async (id: String | undefined) => {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const API_KEY = "476fb38dd78d29e8a3bd10178a2234f0";
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
        params: {
            api_key: API_KEY,
            append_to_response: "videos"
        }
    })
    return data.videos;
}