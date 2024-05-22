// For new actors creation
export interface ActorDto {
    name: string;
    birthDate: Date;
    archive: File;
}

// For actors editiing
export interface ActorEditDto {
    name: string;
    birthDate: Date;
    archive: string;
}
