var express = require('express');
var router = express.Router();
var alumno = require("../models/Alumnos");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
