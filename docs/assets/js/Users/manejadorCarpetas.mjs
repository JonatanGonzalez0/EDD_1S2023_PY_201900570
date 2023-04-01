import AVL from "../Estructuras/arbolAVL.mjs";
import refrescarTabla from "./cargaInicial.mjs";

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
  //refrescar tabla
  refrescarTabla();
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
      refrescarTabla();
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

  let carpetaEliminada = nodoUsuario.arbolCarpetas.eliminarCarpeta(
    nombreCarpeta,
    ruta
  );

  if (carpetaEliminada == 1) {
    alert("La carpeta no existe");
  }
  if (carpetaEliminada == 2) {
    //ACTUALIZAR ARBOL AVL
    localStorage.setItem("arbolAVL", arbolAVL.toJSON());
    alert("Carpeta eliminada correctamente");
    //refrescarTabla
    refrescarTabla();
  }
}

const btnEliminarCarpeta = document.getElementById("btn-eliminarCarpeta");
btnEliminarCarpeta.addEventListener("click", eliminarCarpeta);

//const id subida-archivos
const subidaArchivos = document.getElementById("subida-archivos");
subidaArchivos.addEventListener("change", function () {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  const arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  //obtener el nodo del usuario actual
  const nodoUsuario = arbolAVL.getNodo(carnet);
  //obtener la ruta actual
  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  // Obtener el archivo
  let archivo = subidaArchivos.files[0];
  let nombre_archivo = archivo.name;

  // Leer el archivo como un objeto FileReader
  let lector_archivo = new FileReader();

  // Definir el evento a ejecutar cuando la lectura del archivo esté completa
  lector_archivo.onload = function () {
    // Obtener el contenido en formato base64
    let contenido_base64 = lector_archivo.result;
    //insertar archivo en la matriz
    nodoCarpeta.matriz.insertarArchivo(nombre_archivo, contenido_base64);
    //guardar arbol avl
    try {
      localStorage.setItem("arbolAVL", arbolAVL.toJSON());
    }catch (e) {
      alert("El archivo es muy grande para ser guardado en local storage\n Error: "+e);
    }
    
    //refrescar tabla
    refrescarTabla();
  };

  // Iniciar la lectura del archivo como base64
  lector_archivo.readAsDataURL(archivo);

  //limpiar el input file
  subidaArchivos.value = "";
});


const btnDarPermiso = document.getElementById("btn-darPermiso");
btnDarPermiso.addEventListener("click", function () {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);
  //obtener la ruta actual
  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  let nombre_ArchivoDarPermiso = document.getElementById('dropdown-btn-archivos').textContent;
  let carnetUsuario = document.getElementById('dropdown-btn').textContent;

  //comprobar si formCheck-Write esta checked 
  var formCheckWrite = document.getElementById("formCheck-Write");
  var formCheckRead = document.getElementById("formCheck-Read");
  var tipoPermiso = "";
  
  if (formCheckWrite.checked && formCheckRead.checked) {
    tipoPermiso = "r - w ";
  }else if (formCheckWrite.checked && !formCheckRead.checked) {
    tipoPermiso = "w";
  }else if (!formCheckWrite.checked && formCheckRead.checked) {
    tipoPermiso = "r";
  }

  var seDioPermiso = nodoCarpeta.matriz.darPermiso(carnetUsuario, nombre_ArchivoDarPermiso, tipoPermiso)
  //sediopermiso puede ser true o false
  if (seDioPermiso) {
     //guardar arbol avl
     try {
      localStorage.setItem("arbolAVL", arbolAVL.toJSON());
    }catch (e) {
      alert("No se pudo dar permiso\n Error: "+e);
    }
    //refrescar tabla
    refrescarTabla();
  }else{

    alert("No se pudo dar el permiso");
  }
});