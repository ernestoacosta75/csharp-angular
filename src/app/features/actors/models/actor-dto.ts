export interface ActorDto {
    name: string;
    birthDate: Date;
    archive: File;
}

export interface ActorEditDto {
    name: string;
    birthDate: Date;
    archive: string;
}
