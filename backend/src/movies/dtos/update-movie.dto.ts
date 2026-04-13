import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateMovieDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;
    @IsString()
    @MaxLength(30)
    @IsOptional()
    readonly name: string;
    @IsString()
    @MaxLength(100)
    @IsOptional()
    readonly description: string;
    @IsNumber()
    @IsOptional()
    readonly year: number;
    @IsString()
    @MaxLength(30)
    @IsOptional()
    readonly director: string;
    @IsString()
    @MaxLength(15)
    @IsOptional()
    readonly genre: string;
    @IsBoolean()
    @IsOptional()
    readonly favorite: boolean;
   
}