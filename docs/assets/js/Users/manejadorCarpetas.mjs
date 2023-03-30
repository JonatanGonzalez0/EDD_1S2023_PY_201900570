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

//txt-busqueda id inputBusqueda detectar el evento enter
const inputBusqueda = document.getElementById("inputBusqueda");

inputBusqueda.addEventListener("keyup", function (event) {
  //obtener la ruta buscada en el input inputBusqueda
  let rutaBuscada = document.getElementById("inputBusqueda").value;

  //si se presiona enter
  if (event.keyCode === 13) {
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    //obtener arbol avl
    let arbolAVL = new AVL();
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);

    var existeDir = nodoUsuario.arbolCarpetas.buscarDirectorio(rutaBuscada);
    if (existeDir === 1) {
      alert("La ruta no existe");
      document.getElementById("txt-carpeta-actual").value = "";
    } else {
      document.getElementById("txt-carpeta-actual").value = rutaBuscada;
    }
  }
});

/* funcion para eliminar una carpeta */
function eliminarCarpeta() {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);
  let nombreCarpeta = document.getElementById("txt-carpeta-eliminar").value;
  let ruta = document.getElementById("txt-carpeta-actual").value;

  if (ruta == "") {
    ruta = "/";
  }
  if (ruta == "/") {
    ruta += nombreCarpeta;
  } else {
    ruta += "/" + nombreCarpeta;
  }
  let lista_carpeta = ruta;
  lista_carpeta = lista_carpeta.split("/");
  let carpetaEliminada = nodoUsuario.arbolCarpetas.eliminarCarpeta(nombreCarpeta,lista_carpeta);

  if (carpetaEliminada == 1) {
    alert("La carpeta no existe");
   
    
  }
  if (carpetaEliminada == 2) {
     //ACTUALIZAR ARBOL AVL
     localStorage.setItem("arbolAVL", arbolAVL.toJSON());
    alert("Carpeta eliminada correctamente");
  }
  
}

const btnEliminarCarpeta = document.getElementById("btn-eliminarCarpeta");
btnEliminarCarpeta.addEventListener("click", eliminarCarpeta);
