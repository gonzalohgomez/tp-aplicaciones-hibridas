import express  from "express";
import FaltaUno from "../models/faltaUno_model.js";
import verificarToken from "../middlewares/auth.js";
import Joi from "joi";

const ruta = express.Router();

const schema = Joi.object({
    cantJugador: Joi.number()
            .integer()
            .min(1)
            .max(2)
            .required(),
    deporte: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
    horario: Joi.string()
            .alphanum()
            .min(2)
            .max(6)
            .required(),
    lugar: Joi.string()
            .regex(/^[a-zA-Z0-9\s]+$/)
            .min(2)
            .max(25)
            .required(),
    precio: Joi.number()
            .precision(2)
})

ruta.get('/', verificarToken,(req, res) => {
    let resultado = listarBusquedasActivas();
    resultado.then(busquedas => {
        res.json(busquedas);
    }).catch(err => {
        res.status(400).json(err);
    })
});

ruta.get("/paginacion", verificarToken, async (req, res) => {
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
});


ruta.get("/id/:id", verificarToken, async (req, res) => {
    const faltaUnoID = req.params.id;

    const solicitud = await FaltaUno.findById(faltaUnoID);

    if (solicitud) {
        res.json({ solicitud });
    } else {
        res.status(404).json({ error: "Solicitud no encontrada" });
    }
});

ruta.get("/lugar/:lugar", verificarToken, async (req, res) => {
    const lugarSolicitud = req.params.lugar;

    const lugar = await FaltaUno.findOne({ lugar: lugarSolicitud });

    if (lugar) {
        res.json({ lugar });
    } else {
        res.status(404).json({ error: "Solicitud no encontrada" });
    }
});

ruta.post('/', verificarToken, (req, res) => {
    // console.log(req)
    // let resultado = crearBusqueda(req);

    // resultado.then(busqueda => {
    //     res.json({
    //         busqueda
    //     })
    // }).catch(err => {
    //     res.status(400).json({
    //         err: err.message
    //     })
    // })

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
});

ruta.put("/:id", (req, res)=> {
    let resultado = actualizarSolicitud(req.body, req.params.email);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
})

ruta.delete("/:id", verificarToken,async (req, res) => {
    const faltaUnoID = req.params.id;

    const solicitud = await FaltaUno.findByIdAndDelete(faltaUnoID);

    if (solicitud) {
        res.json({ mensaje: "Solicitud eliminada" });
    } else {
        res.status(404).json({ error: "Solicitud no Encontrada" });
    }
})

async function actualizarSolicitud(body, id){
    let solicitud = await FaltaUno.updateOne({"id": id}, {
        $set:{
            cantJugador: body.cantJugador,
            fecha: body.fecha,
            horario: body.horario,
            lugar: body.lugar,
            precio: body.precio
        }
    })
    return solicitud;
}

async function listarBusquedasActivas() {
    let busquedas = await FaltaUno.find().sort({lugar: 1})
        .populate('deporte', 'nombre -_id')

    return busquedas;
}

async function crearBusqueda(body){
    let busqueda = new FaltaUno({
        cantJugador       : body.cantJugador,
        fecha  : body.fecha,
        horario       : body.horario,
        lugar  : body.lugar,
        precio       : body.precio,
        // profe        : req.usuario
        // deporte: req.deporte._id
    });
    return await busqueda.save();
}

export default ruta;