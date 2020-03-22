var mongoose = require  ('mongoose');

let modelSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo del usuario es obligatorio"]
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6,"La contraseña es demasiado corta"]
    },
});


let admin = mongoose.model("Admins", modelSchema);
module.exports = admin;