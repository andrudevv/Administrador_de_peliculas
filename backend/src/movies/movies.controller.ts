import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto, MovieFilterDto } from 'src/movies/dtos/index';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService
    ) { }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.moviesService.findAll(paginationDto);
    }

    @Get('/search')
    findOne(@Query() movieFilterDto: MovieFilterDto) {
        return this.moviesService.findByTerm(movieFilterDto);
    }

    @Get('/favorite')
    findF() {
        return this.moviesService.findFavorite();
    }


    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.moviesService.findOne(id);
    }




    @Post()
    createMovie(
        @Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.createMovie(createMovieDto);
    }

    @Patch(':id')
    updateMovie(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.updateMovie(id, updateMovieDto);
    }

    @Delete(':id')
    deleteMovie(
        @Param('id', ParseUUIDPipe) id: string) {
        return this.moviesService.delete(id);
    }

}
