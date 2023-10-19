import express  from "express";
import { getUsuarioController, getUsuarioPaginadoController, usuarioFilterByIDController, usuarioFilterByNameController, createUsuarioController, updateUsuariobyEmailController, deleteUsuariobyIDController } from '../controller/usuarioController.js'
import verificarToken from "../middlewares/auth.js";

const ruta = express.Router();

ruta.get('/', verificarToken, getUsuarioController);
ruta.get('/paginacion', verificarToken , getUsuarioPaginadoController);
ruta.get('/id/:id', verificarToken, usuarioFilterByIDController);
ruta.get('/nombre/:nombre', verificarToken, usuarioFilterByNameController);
ruta.post('/', verificarToken, createUsuarioController);
ruta.put('/:email', verificarToken, updateUsuariobyEmailController)
ruta.delete('/:id', verificarToken, deleteUsuariobyIDController)


export default ruta;