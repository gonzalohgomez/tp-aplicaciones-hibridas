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
    // deporte: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'deporte'
    // }, //no sepudooo
    deporte: {
        type: String,
        required: true
    },
    fecha: {//2023-10-25T22:46:06.630Z
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
});

export default mongoose.model('faltaUno', faltaUnoSchema);