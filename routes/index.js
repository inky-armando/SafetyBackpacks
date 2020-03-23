var express = require('express');
var router = express.Router();
var alumno = require("../models/Alumnos");
var admin = require("../models/admins");
var five = require("johnny-five");
const {Board, Leds} = require("johnny-five");
let session;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', estado: "hidden", mensajeError:""});
});

router.get('/admin', function(req,res,next){
  if(session){
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
    console.log("intento de inicio sin sesion activa");
  }
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

router.get('/alumno/:id',async function(req,res,next){
  if(session){
    let Alumno = await alumno.findById(req.params.id);
    res.render('alumnoCheck', {Alumno: Alumno});
  }
  else{
    console.log("intento de inicio sin sesion activa");
    res.redirect('/');
  }
  
});

router.post('/alumno/revisar/:id', async function(req,res,next){
  if(session){
    let Alumno = await alumno.findById(req.params.id);
    let board = new five.Board({
      repl: false
    });

    semaforo(Alumno);

    function foco_rojo(){
      board.on("ready", () => {
          var leds = new Leds([3, 5]);
          leds[0].on();

          console.log("Rojo");
          setTimeout(function(){
            leds[0].off();
            leds[1].off();
            alumno.find().exec(function(error, Alumnos) {res.render('VistaGral', {viewAlumnos: Alumnos})});
            board.on("close", function(){
              console.log("cerrando tablero");
            });
          }, 5000);
          return;
      });
    }

    function foco_verde(){
      board.on("ready", () => {
          var leds = new Leds([3, 5]);
          leds[1].on();

          console.log("Verde");
          setTimeout(function(){
            leds[0].off();
            leds[1].off();
            alumno.find().exec(function(error, Alumnos) {res.render('VistaGral', {viewAlumnos: Alumnos})});
            board.on("close", function(){
              console.log("cerrando tablero");
            });
          }, 5000);
          return;
        });
    }

    async function semaforo(alum){
      let revisar = parseInt(Math.random() * 10) + 1;
      console.log(revisar + "-" + alum.prioridad);
      if(alum.prioridad >= revisar) {
          console.log(alum.nombre + " Revisar");
          try{
            alum.prioridad = (alum.prioridad)/2;
            if(alum.prioridad < 1){
              alum.prioridad = 2;
            }
            console.log(alum.prioridad);
            await alum.save();
          }
          catch(e){
            console.log(e.message);
          }
          foco_rojo();
          console.log(alum);
          console.log(session);
      } 
      else{
          console.log(alum.nombre + " No revisar");
          try{
            alum.prioridad = (alum.prioridad)*2;
            if(alum.prioridad > 10){
              alum.prioridad = 10;
            }
            console.log(alum.prioridad);
            await alum.save();
          }
          catch(e){
            console.log(e.message);
          }
          foco_verde();
          console.log(alum);
          console.log(session);
      }
      return revisar;
      }
    }
  else{
    console.log("intento de inicio sin sesion activa");
    res.redirect('/');
  }
});

module.exports = router;
