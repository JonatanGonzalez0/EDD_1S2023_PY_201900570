import AVL from "../Estructuras/arbolAVL.mjs";
import TablaHash from "../Estructuras/tablaHash.mjs";

export function generarNario() {
  //make container visible
  document
    .getElementById("reportContainer")
    .classList.remove("visually-hidden");

  let arbolAVL = new AVL();
  let graph = "";
  //si existe el arbol en el local storage, cargarlo
  if (localStorage.getItem("arbolAVL") !== null) {
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);
    graph = nodoUsuario.arbolCarpetas.grafica_arbol();
  } else {
    //grafico solo mostrara el mensaje arbol vacio
    graph =
      'digraph NARIO {bgcolor = "gray35";node [style=filled, fillcolor=skyblue];Arbol_Vacio;}';
  }
  let url =
    "https://quickchart.io/graphviz?format=svg&width=1300&height=1000&&graph=";

  url += graph;
  var imagen = document.getElementById("reportImage");
  imagen.src = url;

  // agregar evento 'load' a la imagen para asegurarse de que se cargue completamente antes de llamar al método 'focus()'
  imagen.addEventListener("load", function () {
    imagen.focus();
  });
}

export function generarGrafo() {
  document
    .getElementById("reportContainer")
    .classList.remove("visually-hidden");
  let tablaHash = new TablaHash();
  let graph = "";
  if (localStorage.getItem("tablaHash") !== null) {
    tablaHash.fromJSON(localStorage.getItem("tablaHash"));
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    let NodoUsuario = tablaHash.buscarUsuarioV2(carnet);
    graph = NodoUsuario.grafo.grafica();
  } else {
    graph =
      'digraph G {bgcolor = "gray35";node [style=filled, fillcolor=skyblue];Grafo_vacio;}';
  }
  let url =
    "https://quickchart.io/graphviz?format=svg&width=1300&height=1000&&graph=";
  url += graph;
  var imagen = document.getElementById("reportImage");
  imagen.src = url;
  imagen.addEventListener("load", function () {
    imagen.focus();
  });
}

function hidecontainer() {
  document.getElementById("reportContainer").classList.add("visually-hidden");
}

export const btnreporteCarpetas = document.getElementById("reporteCarpetas");

btnreporteCarpetas.addEventListener("click", generarGrafo);

const btnCerrar = document.getElementById("cerrarGrafico");
btnCerrar.addEventListener("click", hidecontainer);

function generarMatriz() {
  //make container visible
  document
    .getElementById("reportContainer")
    .classList.remove("visually-hidden");

  let arbolAVL = new AVL();
  let graph = "";
  //si existe el arbol en el local storage, cargarlo
  if (localStorage.getItem("arbolAVL") !== null) {
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);
    let rutaActual = document.getElementById("txt-carpeta-actual").value;
    try {
      let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);
      graph = nodoCarpeta.matriz.reporte();
    } catch (error) {
      alert(error);
    }
  } else {
    //grafico solo mostrara el mensaje arbol vacio
    graph =
      'digraph NARIO {bgcolor = "gray35";node [style=filled, fillcolor=skyblue];Arbol_Vacio;}';
  }
  let url =
    "https://quickchart.io/graphviz?format=svg&width=1300&height=1000&&graph=";

  url += graph;
  var imagen = document.getElementById("reportImage");
  imagen.src = url;
  // agregar evento 'load' a la imagen para asegurarse de que se cargue completamente antes de llamar al método 'focus()'
  imagen.addEventListener("load", function () {
    imagen.focus();
  });
}

const btnReportePermisos = document.getElementById("reporteArchivos");
btnReportePermisos.addEventListener("click", generarMatriz);

function generarBitacora() {
  //make container visible
  document
    .getElementById("reportContainer")
    .classList.remove("visually-hidden");

  let arbolAVL = new AVL();
  let graph = "";
  //si existe el arbol en el local storage, cargarlo
  if (localStorage.getItem("arbolAVL") !== null) {
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);
    try {
      graph = nodoUsuario.bitacora.reporte();
    } catch (error) {
      alert(error);
    }
  } else {
    //grafico solo mostrara el mensaje arbol vacio
    graph =
      'digraph Bitacora {bgcolor = "gray35";node [style=filled, fillcolor=skyblue];Sin elementos;}';
  }
  let url =
    "https://quickchart.io/graphviz?format=svg&width=1300&height=1000&&graph=";

  url += graph;

  var imagen = document.getElementById("reportImage");
  imagen.src = url;
  // agregar evento 'load' a la imagen para asegurarse de que se cargue completamente antes de llamar al método 'focus()'
  imagen.addEventListener("load", function () {
    imagen.focus();
  });
}

// btn reporteBitacora
const btnReporteBitacora = document.getElementById("reporteBitacora");
btnReporteBitacora.addEventListener("click", generarBitacora);

export default generarNario;
export { generarMatriz };
