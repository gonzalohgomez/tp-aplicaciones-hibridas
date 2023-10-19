import express  from "express";
import Usuario from "../models/usuarios_model.js";
import bcrypt from "bcrypt"
import verificarToken from "../middlewares/auth.js";
import Joi from "joi";

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
})

ruta.get("/", verificarToken, (req, res) => {
    let resultado = listarUsuarios();
    resultado.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err})
    })
})

ruta.get("/paginacion", verificarToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    try {
        const usuarios = await Usuario.find()
            .skip(skip)
            .limit(limit);

        res.json({ usuarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



ruta.get("/id/:id", verificarToken, async (req, res) => {
    const usuarioID = req.params.id;

    const usuario = await Usuario.findById(usuarioID);

    if (usuario) {
        res.json({ usuario });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

ruta.get("/nombre/:nombre", verificarToken, async (req, res) => {
    const nombreUsuario = req.params.nombre;

    const usuario = await Usuario.findOne({ nombre: nombreUsuario });

    if (usuario) {
        res.json({ usuario });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

ruta.post("/", (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
    })

    if(!error){
            let resultado = crearUsuario(body);
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
})

ruta.put("/:email", (req, res)=> {
    let resultado = actualizarUsuario(req.body, req.params.email);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
        })
})

ruta.delete("/:id", verificarToken,async (req, res) => {
    const usuarioID = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(usuarioID);

    if (usuario) {
        res.json({ mensaje: "Usuario eliminado" });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
})

async function actualizarUsuario(body, email){
    let usuario = await Usuario.updateOne({"email": email}, {
        $set:{
            nombre: body.nombre,
            password: bcrypt.hashSync(body.password, 10)
        }
    })
    return usuario;
}

async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10)
    })
    return await usuario.save();
}

async function listarUsuarios(){
    let usuarios = await Usuario.find({estado: true}).sort({email: 1});
    return usuarios;
}

export default ruta;