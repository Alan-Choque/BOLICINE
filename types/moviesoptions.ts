export interface GetMoviesOptions {
    isTrending?: boolean;
    genre?: string;
    classificationCode?: string; // Por ejemplo "TP", "M-13", etc.
    limit?: number;
}