let five = require("johnny-five");
let board = new five.Board();

let alumnos = [
    {
        nombre:"Armando",
        prioridad: 1
    },
    {
        nombre:"Daniela",
        prioridad: 10
    }
]
alumnos.forEach(alumnos => {
    semaforo(alumnos);
});

function foco_rojo(){
    board.on("ready", function() {
    let led = new five.Led(11);
    led.blink(500);
    });
}

function foco_verde(){
    board.on("ready", function() {
    let led = new five.Led(13);
    led.blink(500);
    });
}


function semaforo(alum){
    let revisar = parseInt(Math.random() * 10) + 1;
    console.log(revisar + "-" + alum.prioridad);
    if(alum.prioridad >= revisar) {
        console.log(alum.nombre + " Revisar");
        alum.prioridad --;
    } 
    else{
        console.log(alum.nombre + " No revisar");
        alum.prioridad ++;
     }
    return revisar;
}