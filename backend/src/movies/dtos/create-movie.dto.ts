import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsPositive, IsString, Max, MaxLength, Min, MinLength, IsOptional } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @MaxLength(30)
    @MinLength(1)
    name: string;
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    description: string;
    @IsInt()
    @IsPositive()
    @Max(2026)
    @Min(1950)
    year: number;
    @IsString()
    @MaxLength(20)
    @MinLength(1)
    director: string;
    @Transform(({ value }) => {
        if (!value) return value;

        const formatted = value
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());

        return formatted;
    })
    @IsIn(['Accion', 'Aventura', 'Animacion', 'Comedia', 'Drama', 'Fantasia', 'Ciencia ficcion', 'Terror', 'Misterio', 'Suspenso'])
    genre: string;
    @IsBoolean()
    @IsOptional()
    favorite?: boolean;

}


