var express = require('express');
var router = express.Router();
var alumno = require("../models/Alumnos");
var admin = require("../models/admins");
let session;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', estado: "hidden", mensajeError:""});
});

router.post('/login', function(req,res,next){
  let data = req.body;
  admin.findOne({correo : data.correo, contrasena: data.contrasena}, function(error, admin){
      if(error){
        console.log(error);
        res.render('index', { mensajeError: error.message, estado: ""});
      }
      else{
        if(admin){
          session = admin.id;
          alumno.find().exec(function(error, Alumnos) {
            if (error) {
                console.log(error.message);
            } else {
                console.log(session);
                console.log(Alumnos);
                res.render('panelAdmin', { viewAlumnos: Alumnos });
            }
          });
        }
        else{
          res.render('index', { mensajeError: "No se encontró el usuario", estado: ""});
        }
      }
    });
});

router.get('/alumnos', function(req,res,next){
  alumno.find().exec(function(error,Alumnos){
    if(error){
      console.log(error.message);
    }
    else{
      console.log(Alumnos);
      res.render('panelAdmin', {viewAlumnos: Alumnos});
    }
  });
});

module.exports = router;
