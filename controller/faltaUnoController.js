import { actualizarSolicitud, crearBusqueda, listarBusquedasActivas } from '../services/faltaUnoServices.js';
import FaltaUno from "../models/faltaUno_model.js";
import schema from "../middlewares/faltaUno.js";

const getFaltaUnoController = (req, res) => {
    let resultado = listarBusquedasActivas();
    resultado.then(busquedas => {
        res.json(busquedas);
    }).catch(err => {
        res.status(400).json(err);
    })
};

const getFaltaUnoPaginadoController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    try {
        const solicitud = await FaltaUno.find()
            .skip(skip)
            .limit(limit);

        res.json({ solicitud });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const faltaUnoFilterByIDController = async (req, res) => {
    const faltaUnoID = req.params.id;

    const solicitud = await FaltaUno.findById(faltaUnoID);

    if (solicitud) {
        res.json({ solicitud });
    } else {
        res.status(404).json({ error: "Solicitud no encontrada" });
    }
};

const faltaUnoFilterByLugarController = async (req, res) => {
    const lugarSolicitud = req.params.lugar;

    const lugar = await FaltaUno.findOne({ lugar: lugarSolicitud });

    if (lugar) {
        res.json({ lugar });
    } else {
        res.status(404).json({ error: "Solicitud no encontrada" });
    }
};

const createFaltaUnoController = (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        cantJugador: body.cantJugador,
        deporte: body.deporte,
        horario: body.horario,
        lugar: body.lugar,
        precio: body.precio,
    })

    if(!error){
            let resultado = crearBusqueda(body);
        resultado.then(user => {
            res.json({
                valor: user
            })
        }).catch(err => {
            res.status(400).json({err})
        })
    }else{
        res.status(400).json({
            error
        })
    }
};

const updateFaltaUnoController = (req, res) => {
    let resultado = actualizarSolicitud(req.body);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
    })
};

const deleteFaltaUnobyIDController = async (req, res) => {
    const faltaUnoID = req.params.id;

    const solicitud = await FaltaUno.findByIdAndDelete(faltaUnoID);

    if (solicitud) {
        res.json({ mensaje: "Solicitud eliminada" });
    } else {
        res.status(404).json({ error: "Solicitud no Encontrada" });
    }
};

export { getFaltaUnoController, getFaltaUnoPaginadoController, faltaUnoFilterByIDController, faltaUnoFilterByLugarController, createFaltaUnoController, updateFaltaUnoController, deleteFaltaUnobyIDController }