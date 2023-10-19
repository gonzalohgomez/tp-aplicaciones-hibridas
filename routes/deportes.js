import express  from "express";
import Deporte from "../models/deportes_model.js";
import verificarToken from "../middlewares/auth.js";
import { getDeporteController, getDeportePaginadoController, deporteFilterByIDController, deporteFilterByNameController, createDeporteController, updateDeportebyIDController, deleteDeportebyIDController } from "../controller/deportesController.js"

const ruta = express.Router();

ruta.get('/', verificarToken, getDeporteController);
ruta.get('/paginacion', verificarToken , getDeportePaginadoController);
ruta.get('/id/:id', verificarToken, deporteFilterByIDController);
ruta.get('/nombre/:nombre', verificarToken, deporteFilterByNameController);
ruta.post('/', verificarToken, createDeporteController);
ruta.put('/:id', verificarToken, updateDeportebyIDController);
ruta.delete('/:id', verificarToken, deleteDeportebyIDController);

export default ruta;