const ROUTES = {
  MOVIES: {
    GET: (id: string) => `/movies/${id}`,
    LIST: "/movies",
    SEARCH: "/movies/search",
    CREATE: "/movies",
    FAVORITE: "/movies/favorite",
    UPDATE: (id: string) => `/movies/${id}`,
    DELETE: (id: string) => `/movies/${id}`,
  },
};

export default ROUTES;