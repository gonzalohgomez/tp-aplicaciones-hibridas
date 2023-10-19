import Deporte from "../models/deportes_model.js";

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

export { actualizarDeporte, listarDeportes, crearDeporte };
