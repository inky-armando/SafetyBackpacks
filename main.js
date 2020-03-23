let five = require("johnny-five");
const {Board, Leds} = require("johnny-five");
let board = new five.Board();

let alumnos = [
    {
        nombre:"Armando",
        prioridad: 5
    }
]

board.on("ready", () => {
    const leds = new Leds([3, 5]);
    leds[0].on();
});
function foco_rojo(){
    board.on("ready", () => {
        const leds = new Leds([3, 5]);
        leds[0].on();
    });
    board.on("exit", function(close){
        console.log("Cerrando tablero");
    });
    
}

function foco_verde(){
    board.on("ready", () => {
        const leds = new Leds([3, 5]);
        leds[1].on();
      });
      board.on("exit", function(close){
        console.log("Cerrando tablero");
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