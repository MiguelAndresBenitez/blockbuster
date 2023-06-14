const express = require('express');
const rutas = express.Router();
const Pelicula = require('../modelo/pelicula');

//Crear peliculas
rutas.post('/peliculas', async (req, res) => {
    try{
        const { titulo, genero, descripcion } = req.body;
        //Verifica si ingresa bien los datos
        const errors = [];
        if (!titulo) {
            errors.push({text: 'por favor ingrese un titulo'});
        };
        if (!genero) {
            errors.push({text: 'por favor ingrese un genero'});
        };
        if (errors.length > 0){
            res.render('../vista/peliculas/crear_pelicula', {
                errors,
                titulo,
                monto,
                descripcion
            });
        };
        //crear la pelicula
        const nuevaPelicula = new Pelicula({ titulo, genero, descripcion });
        await nuevaPelicula.save()
        res.status(201).json({ mensaje: 'Película creada exitosamente', pelicula: nuevaPelicula });
    } catch (err) {
        console.error('Error al crear la película:', error);
        res.status(500).json({ mensaje: 'Error al crear la película' });
    }
});

//Actualizar pelicu
rutas.put('peliculas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, req.body, { new: true });
        if (!peliculaActualizada) {
          return res.status(404).json({ mensaje: 'Película no encontrada' });
        }
        res.status(200).json({ mensaje: 'Película actualizada exitosamente', pelicula: peliculaActualizada });
      } catch (err) {
        console.error('Error al actualizar la película:', err);
        res.status(500).json({ mensaje: 'Error al actualizar la película' });
      }
});

rutas.put('peliculas/:id/estado/:estado', async (req, res) => {
    try {
        const { id } = req.params;
        const { alquilada } = req.body;
    
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(
          id,
          { disponibilidad: alquilada},
          { new: true }
        );
    
        if (!peliculaActualizada) {
          return res.status(404).json({ mensaje: 'Película no encontrada' });
        }
    
        res.status(200).json({ mensaje: 'Estado de alquiler actualizado exitosamente', pelicula: peliculaActualizada });
    } catch (error) {
        console.error('Error al cambiar el estado de alquiler:', error);
        res.status(500).json({ mensaje: 'Error al cambiar el estado de alquiler' });
    }
})


//Eliminar Pelicula
rutas.delete('peliculas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id);
        if (!peliculaEliminada) {
          return res.status(404).json({ mensaje: 'Película no encontrada' });
        }
        res.status(200).json({ mensaje: 'Película eliminada exitosamente', pelicula: peliculaEliminada });
    } catch (err) {
        console.error('Error al eliminar la película:', err);
        res.status(500).json({ mensaje: 'Error al eliminar la película' });
    }
});

module.exports = rutas;