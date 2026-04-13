import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getFavorite, updateMovie, type Movie } from "../services/movieService";

export function PeliculaFavorita() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    const loadFavorites = async () => {
        try {
            const data = await getFavorite();
            setFavorites(data);
        } catch (error) {
            console.error("Error loading favorites", error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const eliminarFavorito = (movie: Movie) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Eliminar película de favoritos!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateMovie({
                        ...movie,
                        favorite: false
                    });

                    setFavorites(prev => prev.filter(m => m.id !== movie.id));
                     Swal.fire({
                                    title: "Actualizado Correctamente!",
                                    icon: "success",
                                    draggable: true
                                });

                } catch (error) {
                    console.error("Error removing favorite:", error);
                }
            }
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} className="mx-auto">

                    <h4 className="text-warning text-center">
                        ⭐ Películas Favoritas
                    </h4>

                    <hr />

                    <Table bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Director</th>
                                <th>Género</th>
                                <th>Año</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {favorites.map(movie => (
                                <tr key={movie.id}>
                                    <td>{movie.name}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.year}</td>
                                    <td className="text-center align-middle " style={{ width: "250px" }}>
                                        <Button
                                            variant="danger"
                                            
                                            onClick={() => eliminarFavorito(movie)}
                                        >
                                            Quitar de favoritos
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {favorites.length === 0 && (
                        <p className="text-center text-muted">
                            No hay películas favoritas
                        </p>
                    )}

                </Col>
            </Row>
        </Container>
    );
}