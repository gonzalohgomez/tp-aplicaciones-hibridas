import Usuario from "../models/usuarios_model.js";
import bcrypt from "bcrypt"

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

export { actualizarUsuario, crearUsuario, listarUsuarios };
