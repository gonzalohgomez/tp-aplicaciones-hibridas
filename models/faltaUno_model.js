import mongoose from "mongoose";
const Schema = mongoose.Schema;


// const profeSchema = new mongoose.Schema({
//     nombre: String, 
//     apellido: String,
// })

const faltaUnoSchema = new mongoose.Schema({
    cantJugador: {
        type:Number,
        required: true
    },
    deporte: {
        type: Schema.Types.ObjectId,
        ref: 'deporte'
    },
    fecha: {
        type:Date,
        required:true,
        default: Date.now
    },    
    horario: {
        type: String,
        default: true
    },
    lugar: {
        type: String,
        required: true        
    },
    precio: {
        type: Number,
        required: false        
    },
    // profe: [profeSchema]
    // profe: {
    //     type: Schema.Types.ObjectId, ref: "Usuarios"
    // }
});

export default mongoose.model('faltaUno', faltaUnoSchema);