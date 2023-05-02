import AVL from "../Estructuras/arbolAVL.mjs";
import Usuario from "../Estructuras/usuario.mjs";
import { refresh, exportAVL } from "../Utils/refreshTable.mjs";

document.addEventListener("DOMContentLoaded", function () {
  function cargarArchivo() {
    //make container invisible
    document.getElementById("reportContainer").classList.add("visually-hidden");

    const inputCargaMasiva = document.getElementById("InputFileCargaMasiva");
    const file = inputCargaMasiva.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const usuarios = JSON.parse(reader.result);

      //variable para guardar el arbol
      let arbolAVL;

      /* verificar si ya existe arbol en localstorage */
      if (localStorage.getItem("arbolAVL") === null) {
        //si no existe, crear el arbol
        arbolAVL = new AVL();
      } else {
        //si existe, cargar el arbol
        arbolAVL = new AVL();
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
      }

      //recorrer el json y agregar los usuarios
      usuarios.alumnos.forEach((usuario) => {
        const nuevoUsuario = new Usuario(
          usuario.nombre,
          usuario.carnet,
          usuario.password,
          usuario.CarpetaRaiz
        );
        //agregar el usuario al arbol
        arbolAVL.insertar(nuevoUsuario);
      });
      //guardar o actualizar el arbol en localstorage
      localStorage.setItem("arbolAVL", arbolAVL.toJSON());
      //limpiar el input file
      inputCargaMasiva.value = "";
      //refrescar la tabla
      refresh("inorden");
      exportAVL();
      //swetalert
      swal({
        title: "Carga Masiva",
        text: "Carga masiva realizada con exito",
        icon: "success",
        button: "Aceptar",
        timer: 1000,
      });
    };
  }

  //cuando se suba el archivo al input file se ejecutara la funcion cargarArchivo
  const inputCargaMasiva = document.getElementById("InputFileCargaMasiva");
  inputCargaMasiva.addEventListener("change", cargarArchivo);

  //agregar listener al boton de subir archivo
  document.getElementById("SubirCargaMasiva").addEventListener("click", () => {
    cargarArchivo();
  });
});
