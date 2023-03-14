import AVL from "./arbolAVL.mjs";
import Usuario from "./usuario.mjs";

document.addEventListener("DOMContentLoaded", function () {
  function cargarArchivo() {
    const inputCargaMasiva = document.getElementById("InputFileCargaMasiva");

    /* leer json usuarios.csv  sintaxins {
	"alumnos": [
		{
			"nombre": "Ebany",
			"carnet": "201403877",
			"password": "qwerty12",
			"CarpetaRaiz": "/"
		},
		{
			"nombre": "Bryan",
			"carnet": "201700375",
			"password": "Bryan131",
			"CarpetaRaiz": "/"
		}
	]
} */
    const file = inputCargaMasiva.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const usuarios = JSON.parse(reader.result);
      console.log(usuarios);
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

      //mostrar mensaje de exito
      Swal.fire({
        icon: "success",
        title: "Carga masiva exitosa",
        text: "Se han agregado los usuarios al sistema",
        showConfirmButton: false,
        timer: 1500,
      });
      
    };
  }

  //agregar listener al boton de subir archivo
  document.getElementById("SubirCargaMasiva").addEventListener("click", () => {
    cargarArchivo();
    console.log("subiendo archivo");
  });
});
