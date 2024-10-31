export interface FilmDto {
    id?: string;
    title: string;
    resume: string;
    onCinemas: boolean;
    trailer: string;
    releaseDate: Date;
    poster: File | string;
}

export interface FilmEditDto {
    title: string;
    resume: string;
    onCinemas: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
}
