import mongoose from "mongoose";
const Schema = mongoose.Schema;


// const profeSchema = new mongoose.Schema({
//     nombre: String, 
//     apellido: String,
// })

const deporteSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
});

export default mongoose.model('deporte', deporteSchema);