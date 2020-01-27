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