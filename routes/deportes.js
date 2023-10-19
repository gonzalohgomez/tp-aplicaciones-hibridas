import express  from "express";
import Deporte from "../models/deportes_model.js";
import verificarToken from "../middlewares/auth.js";
import Joi from "joi";

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string()
            .alphanum()
            .min(3)
            .max(25)
            .required()
})

ruta.get('/', verificarToken,(req, res) => {
    let resultado = listarDeportes();
    resultado.then(deportes => {
        res.json(deportes);
    }).catch(err => {
        res.status(400).json(err);
    })
});

ruta.get("/paginacion", verificarToken, async (req, res) => {
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
});


ruta.get("/id/:id", verificarToken, async (req, res) => {
    const deporteID = req.params.id;

    const deporte = await Deporte.findById(deporteID);

    if (deporte) {
        res.json({ deporte });
    } else {
        res.status(404).json({ error: "Deporte no encontrado" });
    }
});

ruta.get("/nombre/:nombre", verificarToken, async (req, res) => {
    const nombreDeporte = req.params.nombre;

    const deporte = await Deporte.findOne({ nombre: nombreDeporte });

    if (deporte) {
        res.json({ deporte });
    } else {
        res.status(404).json({ error: "Deporte no encontrado" });
    }
});

ruta.post('/', verificarToken, (req, res) => {
    // let resultado = crearDeporte(req);

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
});

ruta.put("/:id", (req, res)=> {
    let resultado = actualizarDeporte(req.body, req.params.email);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
})

ruta.delete("/:id", verificarToken,async (req, res) => {
    const deporteID = req.params.id;

    const sport = await Deporte.findByIdAndDelete(deporteID);

    if (sport) {
        res.json({ mensaje: "Deporte eliminado" });
    } else {
        res.status(404).json({ error: "Deporte no Encontrado" });
    }
})

async function actualizarDeporte(body, id){
    let deporte = await Deporte.updateOne({"id": id}, {
        $set:{
            nombre: body.nombre,
        }
    })
    return deporte;
}

async function listarDeportes(){
    let deportes = await Deporte.find().sort({nombre: 1});
    return deportes;
}


async function crearDeporte(body){
    let busqueda = new Deporte({
        nombre: body.nombre,
    });
    return await busqueda.save();
}

export default ruta;