import AVL from "../Estructuras/arbolAVL.mjs";

//crear nueva carpeta en el directorio actual
let btn_nueva_carpeta = document.getElementById("btn-nuevaCarpeta");
btn_nueva_carpeta.addEventListener("click", function () {
    
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));

    //obtener arbol avl
    let arbolAVL = new AVL();
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);

    let rutaBuscada = document.getElementById("inputBusqueda").value;
    let nombrecarpeta = document.getElementById("txt-carpeta-nueva").value;

    nodoUsuario.arbolCarpetas.insertarRuta(rutaBuscada, nombrecarpeta);

    //guardar arbol avl
    localStorage.setItem("arbolAVL", arbolAVL.toJSON());
    
    console.log(nodoUsuario.arbolCarpetas);

});