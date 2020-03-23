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
  let Alumno = await alumno.findById(req.params.id);
  res.render('alumnoCheck', {Alumno: Alumno});
});

router.post('/alumno/revisar/:id', async function(req,res,next){
  let Alumno = await alumno.findById(req.params.id);
  let board = new five.Board();

  semaforo(Alumno);

  function foco_rojo(){
    board.on("ready", () => {
        const leds = new Leds([3, 5]);
        leds[0].pulse();
    });
  }

  function foco_verde(){
    board.on("ready", () => {
        const leds = new Leds([3, 5]);
        leds[1].pulse();
      });
  }

  function semaforo(alum){
    let revisar = parseInt(Math.random() * 10) + 1;
    console.log(revisar + "-" + alum.prioridad);
    if(alum.prioridad >= revisar) {
        console.log(alum.nombre + " Revisar");
        alum.prioridad --;
        foco_rojo();
    } 
    else{
        console.log(alum.nombre + " No revisar");
        alum.prioridad ++;
        foco_verde();
     }
    return revisar;
    }
})

module.exports = router;
