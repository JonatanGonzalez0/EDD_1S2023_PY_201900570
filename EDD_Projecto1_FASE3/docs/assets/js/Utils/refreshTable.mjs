import AVL from "../Estructuras/arbolAVL.mjs";
import TablaHash from "../Estructuras/tablaHash.mjs";

//cuando se carga la pagina llama a la funcion refresh orderType= inorden

function refresh() {
    // Obtiene la tabla y su cuerpo
    var tabla = document.getElementById("tableUsers");
    var cuerpoTabla = tabla.querySelector("tbody");

    // Borra el contenido del cuerpo de la tabla
    cuerpoTabla.innerHTML = "";
    
    // Actualizar tabla hash from avl
    try {
        var tablaHash = new TablaHash();
        tablaHash.fromJSON();
        for (var i = 0; i < tablaHash.capacidad; i++) {
            if (tablaHash.tabla[i] != null) {
                var nuevaFila = document.createElement("tr");
                nuevaFila.innerHTML = `<td>${tablaHash.tabla[i].carnet}</td><td>${tablaHash.tabla[i].usuario}</td><td>${tablaHash.tabla[i].password}</td>`;
                cuerpoTabla.appendChild(nuevaFila);
            }
        }
    } catch (error) {
        console.log("Error al actualizar tabla hash");
    }
    
    //cargar info de permisos a tabla tablePermisos
    var tablaPermisos = document.getElementById("tablePermisos");
    var cuerpoTablaPermisos = tablaPermisos.querySelector("tbody");
    cuerpoTablaPermisos.innerHTML = "";
    
    let permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    permisos.forEach((permiso) => {
        /**
         *  Permiso = {
                propietario: 'Juan',
                destino: 'Carpeta 1',
                ubicacion: '/documentos',
                nombreArchivo: 'Documento1',
                tipoPermiso: 'r-w'
                };
         */
        var nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `<td>${permiso.propietario}</td><td>${permiso.destino}</td><td>${permiso.ubicacion}</td><td>${permiso.nombreArchivo}</td><td>${permiso.tipoPermiso}</td>`;
        cuerpoTablaPermisos.appendChild(nuevaFila);
    });


    /*/ Obtiene el arbol de localstorage
    var arbolAVL = new AVL();
    if (localStorage.getItem("arbolAVL") !== null) {
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
    }else{
        return;
    }*/
    /* CARGAR TABLA FROM AVL 
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
        nuevaFila.innerHTML = `<td>${usuario.carnet}</td><td>${usuario.nombre}</td><td>${usuario.password}</td>`;
        cuerpoTabla.appendChild(nuevaFila);
    });*/
}

window.onload = function () {
    refresh();
};

//buton para actualizar tabla 
document.getElementById("UpdateFromLOCAL_STORAGE").addEventListener("click", exportAVL);

function exportAVL() {
    // IMPORTAR tabla hash from avl
    try {
        var tablaHash = new TablaHash();
        tablaHash.fromLocalAVL();
        location.reload();
    } catch (error) {
        console.log("Error al actualizar tabla hash");
    }
}



export { refresh, exportAVL };