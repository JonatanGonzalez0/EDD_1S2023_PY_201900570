import AVL from "../Estructuras/arbolAVL.mjs";
import generarNario from "../Reports/reporteUsuarios.mjs";

//en la carga de la pagina, comprobar si existe una sesion iniciada
window.onload = function () {
  if (sessionStorage.getItem("sesion") !== null) {
    //si existe una sesion iniciada, redirigir a la pagina de inicio
    if (sessionStorage.getItem("sesion") === "admin") {
      window.location.href = "./dashboardAdmin.html";
    }
  } else {
    //si no existe una sesion iniciada, redirigir a la pagina de login
    window.location.href = "./login.html";
  }
  //txt-Bienvenida es el elemento que muestra el nombre del usuario
  document.getElementById("txt-Bienvenida").innerHTML =
    "!Bienvenido " + sessionStorage.getItem("sesion") + "!";

  //refrescar la tabla de usuarios
  refrescarTabla();
};

//funcion para refrescar la tabla de usuarios
function refrescarTabla() {
  let body = document.getElementById("cuerpoTablaDirectorioActual");
  body.innerHTML = "";
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));

  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);
  let rutaActual = document.getElementById("txt-carpeta-actual").value;

  if (rutaActual == "") {
    rutaActual = "/";
  }
  let bodyToLoad = nodoUsuario.arbolCarpetas.retornarCuerpoTabla(rutaActual);
  body.innerHTML = bodyToLoad;
  generarNario();

}

export default refrescarTabla;
