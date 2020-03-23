var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    grado:{
        type: String,
        required: [true,"El grado es obligatorio"]
    },
    grupo:{
            type: String,
            enum: ["A", "B", "C"]
    },
    prioridad:{
        type: String,
        required: [true,"La prioridad es obligatoria"]
    }
});

let alumno = mongoose.model("Alumnos", modelSchema);
module.exports = alumno;