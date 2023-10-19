import express  from "express";
import { getFaltaUnoController, getFaltaUnoPaginadoController, faltaUnoFilterByIDController, faltaUnoFilterByLugarController, createFaltaUnoController, updateFaltaUnoController, deleteFaltaUnobyIDController } from '../controller/faltaUnoController.js'
import verificarToken from "../middlewares/auth.js";

const ruta = express.Router();

ruta.get('/', verificarToken, getFaltaUnoController);
ruta.get('/paginacion', verificarToken , getFaltaUnoPaginadoController);
ruta.get('/id/:id', verificarToken, faltaUnoFilterByIDController);
ruta.get('/lugar/:lugar', verificarToken, faltaUnoFilterByLugarController);
ruta.post('/', createFaltaUnoController);
ruta.put('/:id', verificarToken, updateFaltaUnoController);
ruta.delete('/:id', verificarToken, deleteFaltaUnobyIDController);

export default ruta;