import AVL from "../arbolAVL.js";
document.addEventListener("DOMContentLoaded", function () {
    const btnGenerar = document.getElementById("btn-Arbol-AVL");
    btnGenerar.addEventListener("click", generarAVL);
    function generarAVL() {
        const arbolAVL = new AVL();
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
        console.log(arbolAVL.generarDot())
    }   
});
