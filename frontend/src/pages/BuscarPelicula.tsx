import { useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { searchMovie, type Movie } from "../services/movieService";

export function BuscarPelicula() {

    const [filters, setFilters] = useState({
        name: "",
        director: "",
        genre: "",
        year: "",
        favorite: ""
    });

    const [results, setResults] = useState<Movie[]>([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSearch = async () => {
        try {

            const data = await searchMovie({
                director: filters.director || undefined,
                genre: filters.genre || undefined,
                year: filters.year ? Number(filters.year) : undefined,
                favorite:
                    filters.favorite === ""
                        ? undefined
                        : filters.favorite === "true"
            });
            setResults(data);


        } catch (error) {
            console.error("Error buscando peliculas", error);
            setResults([]);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={10} className="mx-auto">

                    <h4 className="text-center text-primary mb-4">
                        Buscar Películas
                    </h4>

                    <Form className="mb-4">

                        <Row>



                            <Col md={3}>
                                <Form.Control
                                    placeholder="Director"
                                    name="director"
                                    value={filters.director}
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col md={2}>
                                <Form.Select
                                    name="genre"
                                    value={filters.genre}
                                    onChange={handleChange}
                                >
                                    <option value="">Todos los géneros</option>
                                    <option value="Accion">Accion</option>
                                    <option value="Aventura">Aventura</option>
                                    <option value="Animacion">Animacion</option>
                                    <option value="Comedia">Comedia</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Fantasia">Fantasia</option>
                                    <option value="Ficcion">Ciencia ficcion</option>
                                    <option value="Terror">Terror</option>
                                    <option value="Misterio">Misterio</option>
                                    <option value="Suspenso">Suspenso</option>
                                </Form.Select>
                            </Col>

                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Año"
                                    name="year"
                                    value={filters.year}
                                    onChange={handleChange}
                                />
                            </Col>

                            <Col md={2}>
                                <Form.Select
                                    name="favorite"
                                    value={filters.favorite}
                                    onChange={handleChange}
                                >
                                    <option value="">Favoritas</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </Form.Select>
                            </Col>

                        </Row>

                        <div className="text-center mt-3">
                            <Button onClick={handleSearch}>
                                Buscar
                            </Button>
                        </div>

                    </Form>


                    <Table bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Director</th>
                                <th>Género</th>
                                <th>Año</th>
                                <th>Favotiros</th>
                            </tr>
                        </thead>

                        <tbody>
                            {results.length > 0 ? (
                                results.map(movie => (
                                    <tr key={movie.id}>
                                        <td>{movie.director}</td>
                                        <td>{movie.genre}</td>
                                        <td>{movie.year}</td>
                                        <td>{movie.favorite ? "⭐" : "-"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted">
                                        Sin resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    );
}