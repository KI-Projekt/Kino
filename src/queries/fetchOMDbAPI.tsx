export const fetchOMDbAPI = async (searchValue: String) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5e74c3a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
};

export const fetchMovie =async (id: String) => {
    const url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=5e74c3a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
}