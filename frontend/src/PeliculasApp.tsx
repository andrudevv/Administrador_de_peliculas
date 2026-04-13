import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar/Navbar";

import { Home } from "./components/Home/Home";
import { ListaPeliculas } from "./pages/ListaPeliculas";
import { NuevaPelicula } from "./pages/NuevaPelicula";
import { EditarPelicula } from "./pages/EditarPelicula";
import { BuscarPelicula } from "./pages/BuscarPelicula";
import { PeliculaFavorita } from "./pages/PeliculaFavorita";



export default function App() {
    return (
        <BrowserRouter>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<ListaPeliculas />} />
                <Route path="/movies/new" element={<NuevaPelicula />} />
                <Route path="/movies/edit/:id" element={<EditarPelicula />} />
                <Route path="/movies/search" element={<BuscarPelicula/>} />
                <Route path="/movies/favorites" element={<PeliculaFavorita />} />
            </Routes>
        </BrowserRouter>
    );
}