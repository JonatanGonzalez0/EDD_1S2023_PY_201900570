import AVL from "../Estructuras/arbolAVL.mjs";

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

function hidecontainer() {
  document.getElementById("reportContainer").classList.add("visually-hidden");
}

export const btnreporteCarpetas = document.getElementById("reporteCarpetas");

btnreporteCarpetas.addEventListener("click", generarNario);

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
    }catch (error) {
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



export default generarNario;
export { generarMatriz };