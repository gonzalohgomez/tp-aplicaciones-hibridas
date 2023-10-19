import FaltaUno from "../models/faltaUno_model.js";

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

export { actualizarSolicitud, crearBusqueda, listarBusquedasActivas };
