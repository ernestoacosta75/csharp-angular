export interface FilmDto {
    title: string;
    resume: string;
    onCinemas: boolean;
    trailer: string;
    releaseDate: Date;
    poster: File;
}

export interface FilmEditDto {
    title: string;
    resume: string;
    onCinemas: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
}
