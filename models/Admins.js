var mongoose = require  ('mongoose');

var modelSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    correo:{
            type: String,
            required: [true,"El correo es obligatorio"]
    },
    contraseña:{
        type: String,
        required: [true,"La contraseña es obligatoria"]
    }
});

var Admin = mongoose.model("Admin",modelSchema);
module.exports = Admin;