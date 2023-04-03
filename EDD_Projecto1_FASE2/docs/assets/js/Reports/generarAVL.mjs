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
    }   

    function hidecontainer() {
        document.getElementById("reportContainer").classList.add("visually-hidden");
    }
    
    function limpiarArbol(){
        //alerta para confirmar que se desea limpiar el arbol
        swal({
            title: "Limpiar Arbol",
            text: "¿Esta seguro que desea limpiar el arbol?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                //si se confirma, se limpia el arbol
                localStorage.removeItem("arbolAVL");               
                generarAVL();
                refresh("inorden");
                swal({
                    title: "Limpiar Arbol",
                    text: "Arbol limpiado con exito",
                    icon: "success",
                    button: "Aceptar",
                    timer:1000,

                });
            } else {
                //si no se confirma, no se hace nada
                return;
            }
        });
        
    }

    const btnGenerar = document.getElementById("btn-Arbol-AVL");
    btnGenerar.addEventListener("click", generarAVL);

    const btnCerrar = document.getElementById("cerrarGrafico");
    btnCerrar.addEventListener("click", hidecontainer);

    const btnLimpiar = document.getElementById("limpiarArbol");
    btnLimpiar.addEventListener("click", limpiarArbol);
});


