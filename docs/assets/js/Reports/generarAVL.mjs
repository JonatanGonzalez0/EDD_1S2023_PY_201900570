import AVL from "../Estructuras/arbolAVL.mjs";
import { refresh } from "../Utils/refreshTable.mjs";

document.addEventListener("DOMContentLoaded", function () {
    function generarAVL() {
        //make container visible
        document.getElementById("reportContainer").classList.remove("visually-hidden");
        
        const arbolAVL = new AVL();
        let graph = "";
        //si existe el arbol en el local storage, cargarlo
        if (localStorage.getItem("arbolAVL") !== null) {
            arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
            graph = arbolAVL.toGraphviz();
        }else{
            //grafico solo mostrara el mensaje arbol vacio
            graph = "digraph AVL {bgcolor = \"gray35\";node [style=filled, fillcolor=skyblue];Arbol_Vacio;}";
        }
        let url = 'https://quickchart.io/graphviz?format=svg&width=1200&height=713&&graph=';
    
        url += graph;   

        document.getElementById("imageAVL").src = url;

        console.log(url)
    }   

    function hidecontainer() {
        document.getElementById("reportContainer").classList.add("visually-hidden");
    }
    
    function limpiarArbol(){
        localStorage.removeItem("arbolAVL");
        
        generarAVL();
        refresh("inorden");
        
    }

    const btnGenerar = document.getElementById("btn-Arbol-AVL");
    btnGenerar.addEventListener("click", generarAVL);

    const btnCerrar = document.getElementById("cerrarGrafico");
    btnCerrar.addEventListener("click", hidecontainer);

    const btnLimpiar = document.getElementById("limpiarArbol");
    btnLimpiar.addEventListener("click", limpiarArbol);
});


