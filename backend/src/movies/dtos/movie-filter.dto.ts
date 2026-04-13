import { IsOptional, IsString, IsInt, IsBoolean, IsIn } from "class-validator";
import { Transform, Type } from "class-transformer";

export class MovieFilterDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  director?: string;
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return value;

    const normalized = value.toLowerCase().trim();

    const map = {
      'accion': 'Accion',
      'aventura': 'Aventura',
      'animacion': 'Animacion',
      'comedia': 'Comedia',
      'drama': 'Drama',
      'fantasia': 'Fantasia',
      'ficcion': 'Ficcion',
      'terror': 'Terror',
      'misterio': 'Misterio',
      'suspenso': 'Suspenso'
    };

    return map[normalized] || value;
  })
  @IsIn([
    'Accion','Aventura','Animacion','Comedia',
    'Drama','Fantasia','Ficcion',
    'Terror','Misterio','Suspenso'
  ])
  genre?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  favorite?: boolean;
}