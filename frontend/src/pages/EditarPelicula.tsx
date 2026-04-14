import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import Form from "react-bootstrap/Form"
import { Container, Row, Col, Button } from "react-bootstrap"
import { getMovie, updateMovie, type Movie } from "../services/movieService"

const initialPelicula: Movie = {
    id: "0",
    name: "",
    description: "",
    year: 2000,
    director: "",
    genre: "",
    favorite: false
};

export function EditarPelicula() {

    const { id } = useParams<{ id: string }>();
    const [pelicula, setPelicula] = useState<Movie>(initialPelicula);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPelicula = async () => {
            if (id) {
                try {
                    const data = await getMovie(id);
                    setPelicula(data);
                } catch (error) {
                    console.error("Error fetching movie:", error);
                }
            }
        };

        obtenerPelicula();
    }, [id]);

    const inputChangeValue = (event: any) => {
        const { name, value, type, checked } = event.target;

        setPelicula({
            ...pelicula,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const guardar = async () => {
        try {
            await updateMovie(pelicula);
             Swal.fire({
                            title: "Actualizado Correctamente!",
                            icon: "success",
                            draggable: true
                        });
            navigate("/");
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "No se pudo editar la película",
                icon: "error"
            });
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={8} className="mx-auto">

                    <h4 className="text-primary">Editar Película</h4>
                    <hr />

                    <Form>

                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={pelicula.name}
                            onChange={inputChangeValue}
                        />

                        <Form.Label className="mt-2">Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={pelicula.description}
                            onChange={inputChangeValue}
                        />

                        <Form.Label className="mt-2">Año</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={pelicula.year}
                            onChange={inputChangeValue}
                        />

                        <Form.Label className="mt-2">Director</Form.Label>
                        <Form.Control
                            type="text"
                            name="director"
                            value={pelicula.director}
                            onChange={inputChangeValue}
                        />

                        <Form.Label className="mt-2">Género</Form.Label>
                        <Form.Select
                            name="genre"
                            value={pelicula.genre}
                            onChange={inputChangeValue}
                        >
                            <option value="">Seleccione</option>
                            <option>Accion</option>
                            <option>Aventura</option>
                            <option>Animacion</option>
                            <option>Comedia</option>
                            <option>Drama</option>
                            <option>Fantasia</option>
                            <option>Ciencia ficcion</option>
                            <option>Terror</option>
                            <option>Misterio</option>
                            <option>Suspenso</option>
                        </Form.Select>

                        <Form.Check
                            className="mt-3"
                            type="checkbox"
                            label="Favorita ⭐"
                            name="favorite"
                            checked={pelicula.favorite}
                            onChange={inputChangeValue}
                        />

                    </Form>

                    <Button className="mt-3 me-3" onClick={guardar}>
                        Guardar
                    </Button>

                    <Button variant="secondary" className="mt-3">
                        Volver
                    </Button>

                </Col>
            </Row>
        </Container>
    );
}