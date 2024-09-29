export interface CinemaDto {
    id?: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface CinemaEditDto {
    name: string;
    latitude: number;
    longitude: number;
}