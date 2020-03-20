var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    grado:{
        type: String,
        required: [true,"El grado es obligatorio"],
    },
    grupo:{
            type: String,
            enum: ["A", "B", "C"]
    },
    prioridad:{
        type: String,
        enum: ["1","2","3","4","5","6","7","8","9","10"]
    }
});

var Alumno = mongoose.model("Alumno",modelSchema);
module.exports = Alumno;