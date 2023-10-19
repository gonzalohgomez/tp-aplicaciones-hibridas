import { actualizarUsuario, crearUsuario, listarUsuarios } from '../services/usuarioServices.js';
import Usuario from "../models/usuarios_model.js";
import schema from "../middlewares/usuarios.js";

const getUsuarioController = (req, res) => {
    let resultado = listarUsuarios();
    resultado.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err})
    })
};

const getUsuarioPaginadoController = async (req, res) => {
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
};

const usuarioFilterByIDController = async (req, res) => {
    const usuarioID = req.params.id;

    const usuario = await Usuario.findById(usuarioID);

    if (usuario) {
        res.json({ usuario });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
};

const usuarioFilterByNameController = async (req, res) => {
    const nombreUsuario = req.params.nombre;

    const usuario = await Usuario.findOne({ nombre: nombreUsuario });

    if (usuario) {
        res.json({ usuario });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
};

const createUsuarioController = (req, res) => {
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
};

const updateUsuariobyEmailController = (req, res) => {
    let resultado = actualizarUsuario(req.body, req.params.email);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
            res.status(400).json({err})
    })
};

const deleteUsuariobyIDController = async (req, res) => {
    const usuarioID = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(usuarioID);

    if (usuario) {
        res.json({ mensaje: "Usuario eliminado" });
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
};

export { getUsuarioController, getUsuarioPaginadoController, usuarioFilterByIDController, usuarioFilterByNameController, createUsuarioController, updateUsuariobyEmailController, deleteUsuariobyIDController }