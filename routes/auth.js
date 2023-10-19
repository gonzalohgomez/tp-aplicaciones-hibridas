import express  from "express";
// import Usuario from "../models/usuarios_model.js";
import "dotenv/config";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"
import {  createAuthController } from '../controller/authController.js'
const ruta = express.Router();

ruta.post('/', createAuthController);

export default ruta;