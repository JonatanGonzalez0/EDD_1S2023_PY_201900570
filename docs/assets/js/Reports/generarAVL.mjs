import AVL from "../Estructuras/arbolAVL.mjs";

document.addEventListener("DOMContentLoaded", function () {
    function generarAVL() {
        const arbolAVL = new AVL();
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
        console.log(arbolAVL.generarDot())
    }   
    
    const btnGenerar = document.getElementById("btn-Arbol-AVL");
    btnGenerar.addEventListener("click", generarAVL);
});