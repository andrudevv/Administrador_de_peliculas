import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { getMovies, deleteMovie, type Movie } from "../services/movieService"

export function ListaPeliculas() {
    const [peliculas, setPeliculas] = useState<Movie[]>([]);

    const obtenerPeliculas = async () => {
        try {
            const data = await getMovies();
            setPeliculas(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        obtenerPeliculas();
    }, []);

    const Eliminar = (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Eliminar película!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteMovie(id);
                     Swal.fire({
                                    title: "Eliminado Correctamente!",
                                    icon: "success",
                                    draggable: true
                                });
                    await obtenerPeliculas();

                    
                } catch (error) {
                    console.error("Error deleting movie:", error);
                }
            }
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={10} className="offset-sm-1">
                    <h4 className="text-primary">Lista de Películas</h4>
                    <hr />

                    

                    <Table bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Director</th>
                                <th>Año</th>
                                <th>Género</th>
                                <th>Favorito</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {peliculas.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.director}</td>
                                    <td>{item.year}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.favorite ? "⭐" : "—"}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary me-2"
                                            to={`/movies/edit/${item.id}`}
                                        >
                                            Editar
                                        </Link>

                                        <Button color="danger" onClick={() => Eliminar(item.id!)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}