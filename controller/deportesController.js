import { actualizarDeporte, listarDeportes, crearDeporte } from '../services/deportesServices.js';
import Deporte from "../models/deportes_model.js";
import schema from "../middlewares/usuarios.js";

const getDeporteController = (req, res) => {
    let resultado = listarDeportes();
    resultado.then(deportes => {
        res.json(deportes);
    }).catch(err => {
        res.status(400).json(err);
    })
};

const getDeportePaginadoController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    try {
        const deportes = await Deporte.find()
            .skip(skip)
            .limit(limit);

        res.json({ deportes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deporteFilterByIDController = async (req, res) => {
    const deporteID = req.params.id;

    const deporte = await Deporte.findById(deporteID);

    if (deporte) {
        res.json({ deporte });
    } else {
        res.status(404).json({ error: "Deporte no encontrado" });
    }
};

const deporteFilterByNameController = async (req, res) => {
    const nombreDeporte = req.params.nombre;

    const deporte = await Deporte.findOne({ nombre: nombreDeporte });

    if (deporte) {
        res.json({ deporte });
    } else {
        res.status(404).json({ error: "Deporte no encontrado" });
    }
};

const createDeporteController = (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        nombre: body.nombre
    })

    if(!error){
            let resultado = crearDeporte(body);
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

const updateDeportebyIDController = (req, res) => {
    let resultado = actualizarDeporte(req.body);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
};

const deleteDeportebyIDController = async (req, res) => {
    const deporteID = req.params.id;

    const sport = await Deporte.findByIdAndDelete(deporteID);

    if (sport) {
        res.json({ mensaje: "Deporte eliminado" });
    } else {
        res.status(404).json({ error: "Deporte no Encontrado" });
    }
};

export { getDeporteController, getDeportePaginadoController, deporteFilterByIDController, deporteFilterByNameController, createDeporteController, updateDeportebyIDController, deleteDeportebyIDController }