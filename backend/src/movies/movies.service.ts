import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto, MovieFilterDto } from 'src/movies/dtos/index';
import { Movie } from './entities/movie.entity';
import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class MoviesService {
    private readonly logger = new Logger('MoviesService');
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) { }

    findAll(paginationDto: PaginationDto) {

        const { limit = 10, offset = 0 } = paginationDto;

        return this.movieRepository.find({
            take: limit,
            skip: offset,
        })
    }


    async findOne(id: string) {
        const movie = await this.movieRepository.findOneBy({ id });

        if (!movie) {
            throw new NotFoundException(`Película con id ${id} no encontrada`);
        }

        return movie;
    }

    async findFavorite() {
        const movies = await this.movieRepository.find({
            where: { favorite: true },
        });

        if (movies.length === 0) {
            throw new NotFoundException('No hay películas favoritas');
        }

        return movies;
    }

    
    async findByTerm(movieFilterDto: MovieFilterDto) {
        const query = this.movieRepository.createQueryBuilder('movie');


        if (movieFilterDto.director) {
            query.andWhere('UPPER(movie.director) LIKE :director', {
                director: `%${movieFilterDto.director.toUpperCase()}%`,
            });
        }

        if (movieFilterDto.year) {
            query.andWhere('movie.year = :year', {
                year: movieFilterDto.year,
            });
        }

        if (movieFilterDto.favorite !== undefined) {
            query.andWhere('movie.favorite = :favorite', {
                favorite: movieFilterDto.favorite,
            });
        }
        if (movieFilterDto.genre) {
            query.andWhere('movie.genre = :genre', {
                genre: movieFilterDto.genre,
            });
        }

        const results = await query.getMany();

        if (results.length === 0) {
            throw new NotFoundException('No se encontraron películas con esos terminos');
        }

        return results;
    }



    async createMovie(createMovieDto: CreateMovieDto) {

        try {
            const movie = this.movieRepository.create(createMovieDto);
            await this.movieRepository.save(movie);
            return true;

        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async updateMovie(id: string, updateMovieDto: UpdateMovieDto) {

        const movie = await this.movieRepository.preload({
            id: id,
            ...updateMovieDto
        })

        if (!movie) throw new NotFoundException(`Pelicula con id ${id}, no encontrada.`);

        try {
            await this.movieRepository.save(movie);
            return true;

        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async delete(id: string) {
        const movie = await this.findOne(id);
        await this.movieRepository.remove(movie);
    }


    private handleDBExceptions(error: any) {

        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error);
        throw new InternalServerErrorException('Error inesperado');

    }

}

