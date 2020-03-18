var mongoose = require  ('mongoose');

var modelSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"Lanombre es obligatorio"]
    },
    grado:{
        type: String,
        required: [true,"El grado es obligatorio"],
    },
    grupo:{
            type: String,
            required: [true,"El grupo es obligatorio"],
            enum: ["A", "B", "C"]
    }
});

var Alumno = mongoose.model("Alumno",modelSchema);
module.exports = Alumno;