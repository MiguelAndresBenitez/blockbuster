const express = require('express');
const rutas = express.Router();
const Reserva = require('../modelo/reserva.js');
const Pellicula = require('../modelo/pelicula');
const Usuario = require('../modelo/usuario.js');

//Crear reserva
rutas.post('/reservas', async (req,res) => {
    try {
        const { _id_usuario, _id_pelicula, fecha } = req.body;

        //verificar si el usuario o la peli existen
        const usuario = await Usuario.findById(_id_usuario);
        const pelicula = await Pellicula.findById(_id_pelicula);
        if (!usuario || !pelicula) {
            return res.status(404).json({ mensaje: 'Usuario o película no encontrada' });
            //return res.render('../vista/reserva/lista.html', {
            //    responses: `la reserva no se pudo hacer por ${err}` 
            //})
        }

        // Crear la reserva
        const nuevaReserva = new Reserva({
            _id_usuario,
            _id_pelicula,
            fecha
        });
        await nuevaReserva.save()
            // .then((response) => {
            //     if(response){
        res.status(201).json({ mensaje: 'Reserva creada exitosamente', reserva: nuevaReserva });
            //     }
            // }).catch((err) => {
            //     console.error('Error al crear la reserva:', err);
            //     res.status(500).json({ mensaje: 'Error al crear la reserva' });
            // });
    } catch (err) {
        console.error('Error al crear la reserva:', err);
        res.status(500).json({ mensaje: 'Error al crear la reserva' });
    }
});

//lista de reservas
rutas.get('/reservas', async (req, res) => {
    try {
        const usuarioId = req.Usuario._id; // Obtenemos el id del usuario actual

        //Buscar las resercvas del usurio actual
        const reservas = await Reserva.find({_id_usuario: usuarioId})
        res.status(200).json(reservas);
    } catch (err) {
        console.error('Error al obtener las reservas:', err);
        res.status(500).json({ mensaje: 'Error al obtener las reservas' });
    }
});

//Terminar la reserva
rutas.delete('/reservas', async (req, res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const reservaTerminada = await Reserva.findByIdAndDelete(id)
            .then(()=>{
                return res.status(200).json({ mensaje: 'Reserva eliminada exitosamente', reserva: reservaTerminada });
            })
            .catch((err)=>{
                return res.status(404).json({ mensaje: 'Reserva no encontrada' });
            });
    } catch (err) {
        confirm.error('Error al eliminar la reserva:', err);
        res.status(500).json({  mensaje: 'Error al eliminar la reserva' });
    }
})

module.exports = rutas;