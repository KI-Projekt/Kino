export interface ReviewArrayTags{
    rating: number | null;
    tags: Array<String>;
    movieId: number;
    userId: number | undefined;
}

export interface ReviewStringTags{
    rating: number | null;
    tags:  string;
    movieId: number;
    userId: number | undefined;
}


export interface AiScore {
    body: Array<AiScoreBody>;
    statusCode: String;
    statusCodeValue: number
}

export interface AiScoreBody {
    movieId: number;
    score: number;
}
