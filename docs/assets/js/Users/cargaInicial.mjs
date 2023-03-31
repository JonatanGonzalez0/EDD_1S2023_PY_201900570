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
  refreshdropdown_menu_usuarios();
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

function refreshdropdown_menu_usuarios() {
  let dropdown = document.getElementById("dropdown-menu-usuarios");
  dropdown.innerHTML = "";
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  let carnet = parseInt(sessionStorage.getItem("sesion"));
  
  var usuarios = arbolAVL.inOrden();

  var cadena = "";
  var usuarios = arbolAVL.inOrden();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].carnet !== carnet) {
      cadena += '<a class="dropdown-item" data-carnet="' + usuarios[i].carnet + '">' + usuarios[i].carnet + "</a>";
      cadena += "\n";
    }
  }
  dropdown.innerHTML = cadena;

  // Agrega el evento de escucha
  var dropdownItems = document.getElementsByClassName('dropdown-item');
  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener('click', function() {
      var carnet = this.dataset.carnet;
      document.getElementById('dropdown-btn').textContent = carnet;
    });
  }
  

}



export default refrescarTabla;
