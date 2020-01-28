let five = require("johnny-five");
let board = new five.Board();

let alumnos = [
    {
        nombre:"Armando",
        prioridad: 1
    }/*,
    {
        nombre:"Daniela",
        prioridad: 10
    }*/
]
alumnos.forEach(alumnos => {
    semaforo(alumnos);
});

function foco_rojo(){
    board.on("ready", function() {
    let ledr = new five.Led(11);
    ledr.on(3000);
    });
}

function foco_verde(){
    board.on("ready", function() {
    let ledv = new five.Led(13);
    ledv.blink(5000);
    console.log("Apagando foco");
    stopled(ledv);
    });
}

function stopled(led){
    led.off();
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
        foco_verde();
     }
    return revisar;
}