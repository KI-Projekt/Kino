export interface Review{
    rating: number | null;
    genre: Array<String>;
    tag: Array<String>;
    movieId: number;
    userId: number;
}

export interface UserGerne{
    genre: Array<String>;
    userId: number;
}