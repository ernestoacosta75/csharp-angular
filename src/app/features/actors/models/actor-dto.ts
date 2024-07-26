// For new actors creation
export interface ActorDto {
    id?: string;
    name: string;
    birthDate: Date;
    archive: string | File;
}

// For actors editiing
export interface ActorEditDto {
    name: string;
    birthDate: Date;
    archive: string;
}
