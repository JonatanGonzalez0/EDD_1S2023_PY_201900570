import AVL from "../Estructuras/arbolAVL.mjs";
import { refresh } from "../Utils/refreshTable.mjs";
import Bloque from "../Estructuras/bloques.mjs";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("index_id").textContent = 0;

  function generarGrafico() {
    const bloque = new Bloque();
    bloque.fromJSON();

    let graph = "";
    //si existe el arbol en el local storage, cargarlo
    if (localStorage.getItem("bloques") !== null) {
      graph = bloque.toGraphviz();
    } else {
      //grafico solo mostrara el mensaje arbol vacio
      graph =
        'digraph AVL {bgcolor = "gray35";node [style=filled, fillcolor=skyblue];Sin bloques;}';
    }
    let url =
      "https://quickchart.io/graphviz?format=svg&width=1200&height=713&&graph=";

    url += graph;

    document.getElementById("imageAVL").src = url;
    //make container visible
    document
      .getElementById("reportContainer")
      .classList.remove("visually-hidden");
  }
  const btnGenerarBloques = document.getElementById("generarGraficoBlockchain");
  btnGenerarBloques.addEventListener("click", generarGrafico);

  function hidecontainer() {
    document.getElementById("reportContainer").classList.add("visually-hidden");
  }
  const btnCerrar = document.getElementById("cerrarGrafico");
  btnCerrar.addEventListener("click", hidecontainer);

  /*
    FUNCIONES PARA ARBOL AVL * NO SE UTILIZAN
    function hidecontainer() {
        document.getElementById("reportContainer").classList.add("visually-hidden");
    } 
    const btnGenerar = document.getElementById("btn-Arbol-AVL");
    btnGenerar.addEventListener("click", generarGrafico);

    const btnCerrar = document.getElementById("cerrarGrafico");
    btnCerrar.addEventListener("click", hidecontainer);
    */

  function limpiarArbol() {
    //alerta para confirmar que se desea limpiar el arbol
    swal({
      title: "Limpiar Arbol",
      text: "¿Esta seguro que desea limpiar el arbol?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //si se confirma, se limpia el arbol
        localStorage.removeItem("arbolAVL");
        generarGrafico();
        refresh("inorden");
        swal({
          title: "Limpiar Arbol",
          text: "Arbol limpiado con exito",
          icon: "success",
          button: "Aceptar",
          timer: 1000,
        });
      } else {
        //si no se confirma, no se hace nada
        return;
      }
    });
  }
  const btnLimpiar = document.getElementById("limpiarArbol");
  btnLimpiar.addEventListener("click", limpiarArbol);

  const reporteBlockchain = document.getElementById("reporteBlockchain");

  function generarReporteBlockchain() {
    const elementoP_Reporte = document.getElementById("txtReporteBlokchain");
    elementoP_Reporte.innerHTML = "";
    const index_id = document.getElementById("index_id");
    //obtener el texto del index_id
    let index_actual = parseInt(index_id.textContent);

    //obtener el texto del textarea
    const bloque = new Bloque();
    bloque.fromJSON();

    let bloqueActual = bloque.getBloqueByIndex(index_actual);
    elementoP_Reporte.innerHTML = `
    Index: ${bloqueActual.valor.index}<br><br>
    TimeStamp: ${bloqueActual.valor.timestamp}<br><br>
    Emisor: ${bloqueActual.valor.transmitter}<br><br>
    Receptor: ${bloqueActual.valor.receiver}<br><br>
    Mensaje: ${bloqueActual.valor.message}<br><br>
    PreviousHash: ${bloqueActual.valor.previoushash}<br><br>
    Hash: ${bloqueActual.valor.hash}<br><br>
`;
  }

  reporteBlockchain.addEventListener("click", function () {
    const reportContainerBlockchain = document.getElementById(
      "reportContainerBlockchain"
    );
    generarReporteBlockchain();
    if (reportContainerBlockchain.classList.contains("visually-hidden")) {
      reportContainerBlockchain.classList.remove("visually-hidden");
      reportContainerBlockchain.classList.add("visually-show");
    } else {
      reportContainerBlockchain.classList.remove("visually-show");
      reportContainerBlockchain.classList.add("visually-hidden");
    }
  });
});

bloqueSiguiente.addEventListener("click", function () {
  let index_actual = parseInt(index_id.textContent);
  let nuevoIndex = index_actual + 1;

  const bloque = new Bloque();
  bloque.fromJSON();

  const bloqueSiguiente = bloque.getBloqueByIndex(nuevoIndex);
  if (bloqueSiguiente != null) {
    index_id.textContent = nuevoIndex;

    txtReporteBlokchain.innerHTML = `
        Index: ${bloqueSiguiente.valor.index}<br><br>
        TimeStamp: ${bloqueSiguiente.valor.timestamp}<br><br>
        Emisor: ${bloqueSiguiente.valor.transmitter}<br><br>
        Receptor: ${bloqueSiguiente.valor.receiver}<br><br>
        Mensaje: ${bloqueSiguiente.valor.message}<br><br>
        PreviousHash: ${bloqueSiguiente.valor.previoushash}<br><br>
        Hash: ${bloqueSiguiente.valor.hash}<br><br>
    `;
  }
});

bloqueAnterior.addEventListener("click", function () {
  let index_actual = parseInt(index_id.textContent);
  let nuevoIndex = index_actual - 1;

  const bloque = new Bloque();
  bloque.fromJSON();

  const bloqueAnterior = bloque.getBloqueByIndex(nuevoIndex);
  if (bloqueAnterior != null) {
    index_id.textContent = nuevoIndex;

    txtReporteBlokchain.innerHTML = `
        Index: ${bloqueAnterior.valor.index}<br><br>
        TimeStamp: ${bloqueAnterior.valor.timestamp}<br><br>
        Emisor: ${bloqueAnterior.valor.transmitter}<br><br>
        Receptor: ${bloqueAnterior.valor.receiver}<br><br>
        Mensaje: ${bloqueAnterior.valor.message}<br><br>
        PreviousHash: ${bloqueAnterior.valor.previoushash}<br><br>
        Hash: ${bloqueAnterior.valor.hash}<br><br>
    `;
  }
});
