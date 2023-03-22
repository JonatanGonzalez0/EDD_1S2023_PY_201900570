import AVL from "../Estructuras/arbolAVL.mjs";

//cuando se carga la pagina llama a la funcion refresh orderType= inorden

function refresh(orderType) {
    // Obtiene la tabla y su cuerpo
    var tabla = document.getElementById("tableUsers");
    var cuerpoTabla = tabla.querySelector("tbody");

    // Borra el contenido del cuerpo de la tabla
    cuerpoTabla.innerHTML = "";
    // Obtiene el arbol de localstorage
    var arbolAVL = new AVL();
    if (localStorage.getItem("arbolAVL") !== null) {
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
    }else{
        return;
    }

    // Obtiene el arreglo de usuarios
    if (orderType == "inorden"){
        var usuarios = arbolAVL.inOrden();
    }else if (orderType == "preorden"){
        var usuarios = arbolAVL.preOrden();
    }else if (orderType == "postorden"){
        var usuarios = arbolAVL.postOrden();
    }

    // Recorre el arreglo de usuarios
    usuarios.forEach((usuario) => {
        // Crea una nueva fila para la tabla
        var nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `<td>${usuario.carnet}</td><td>${usuario.nombre}</td>`;
        cuerpoTabla.appendChild(nuevaFila);
    });
}

window.onload = function () {
    refresh("inorden");
};

//buton inorden 
document.getElementById("InOrden").addEventListener("click", () => {
    refresh("inorden");
});

//buton preorden
document.getElementById("PreOrden").addEventListener("click", () => {
    refresh("preorden");
});
//buton postorden
document.getElementById("PostOrden").addEventListener("click", () => {
    refresh("postorden");
});

