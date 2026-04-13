import axiosClient from '../api/axiosClient';
import ROUTES from '../api/routes';

export interface Movie {
    id?: number | string;
    name: string;
    description: string;
    year: number;
    director: string;
    genre: string;
    favorite?: boolean;
}
const handleError = (error: any)  => {
    if (error.response) {
        throw new Error(error.response.data?.message || "Error en el servidor");
    } else if (error.request) {
        throw new Error("No hay respuesta del servidor");
    } else {
        throw new Error(error.message);
    }
};
export const getMovies = async (): Promise<Movie[]> => {
    try {
        const response = await axiosClient.get(ROUTES.MOVIES.LIST);
        return response.data;
    } catch (error) {
        handleError(error);
        return [];
    }

};

export const createMovie = async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
    try {
        const response = await axiosClient.post(ROUTES.MOVIES.CREATE, movie);
        return response.data;
        
    } catch (error) {
        throw handleError(error);
    }
};

export const getMovie = async (id: string): Promise<Movie> => {
    try {
        const response = await axiosClient.get(ROUTES.MOVIES.GET(id));
        return response.data;
        
    } catch (error) {
        throw handleError(error);
    }
};

export const getFavorite = async (): Promise<Movie> => {
    try {
        const response = await axiosClient.get(ROUTES.MOVIES.FAVORITE);
        return response.data;
        
    } catch (error) {
        throw handleError(error);
    }
};


export const searchMovie = async (filters: {
    name?: string;
    director?: string;
    year?: number;
    genre?: string;
    favorite?: boolean;
}) => {
    try {
        const response = await axiosClient.get(ROUTES.MOVIES.SEARCH, {
            params: filters
        });
        return response.data;
        
    } catch (error) {
        throw handleError(error);
    }


}

export const updateMovie = async (movie: Movie): Promise<Movie> => {
    try {
        const response = await axiosClient.patch(
            ROUTES.MOVIES.UPDATE(movie.id!.toString()),
            movie
        );
        return response.data;
        
    } catch (error) {
        throw handleError(error);
    }
};

export const deleteMovie = async (id: number | string): Promise<void> => {
    try {
         await axiosClient.delete(ROUTES.MOVIES.DELETE(id.toString()));
        
    } catch (error) {
       throw handleError(error);
    }
};