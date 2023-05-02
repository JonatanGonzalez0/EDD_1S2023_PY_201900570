import AVL from "../Estructuras/arbolAVL.mjs";
import Bloque from "../Estructuras/bloques.mjs";
import { desencriptacion, encriptacion } from "../Utils/encriptacionAES.mjs";

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

  //refrescar la tabla de usuarios
  refrescarTabla();
  refreshdropdown_menu_usuarios();
  refreshdropdown_archivos();

  //refrescar container chats
  refreshContainerChats();
  window.verChatDe = verChatDe;
};

//funcion para refrescar la tabla de usuarios
function refrescarTabla() {
  let body = document.getElementById("cuerpoTablaDirectorioActual");
  body.innerHTML = "";
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));

  //obtener arbol avl desde el local storage
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
  refreshdropdown_archivos();
  refreshdropdown_menu_usuarios();
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
      cadena +=
        '<a class="dropdown-item" data-carnet="' +
        usuarios[i].carnet +
        '">' +
        usuarios[i].carnet +
        "</a>";
      cadena += "\n";
    }
  }
  dropdown.innerHTML = cadena;
  // Agrega el evento de escucha
  var dropdownItems = dropdown.getElementsByClassName("dropdown-item");
  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function () {
      var carnet = this.dataset.carnet;
      document.getElementById("dropdown-btn").textContent = carnet;
    });
  }
}

function refreshdropdown_archivos() {
  let dropdown = document.getElementById("dropdown-menu-archivos");
  dropdown.innerHTML = "";
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  let carnet = parseInt(sessionStorage.getItem("sesion"));

  let nodoUsuario = arbolAVL.getNodo(carnet);
  let rutaActual = document.getElementById("txt-carpeta-actual").value;

  if (rutaActual == "") {
    rutaActual = "/";
  }
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  let body = nodoCarpeta.matriz.retornarArchivosDropdown();
  dropdown.innerHTML = body;
  // Agrega el evento de escucha
  var dropdownItems = dropdown.getElementsByClassName("dropdown-item");
  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function () {
      var nombre = this.dataset.nombre;
      document.getElementById("dropdown-btn-archivos").textContent = nombre;
    });
  }
}

function refreshContainerChats() {
  const id_Emisor = parseInt(sessionStorage.getItem("sesion"));
  const chat_id_Emisor = document.getElementById("chat_id_Emisor");
  
  

  const div_receptores = document.getElementById("div_receptores");
  div_receptores.innerHTML = "";
  //obtener cada usuario excepto el usuario actual
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  let nodoEmisor = arbolAVL.getNodo(id_Emisor);
  chat_id_Emisor.textContent = "Yo : [" + id_Emisor.toString() + "]" ;

  let usuarios = arbolAVL.inOrden();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].carnet !== id_Emisor) {
      let ul_receptor = `<ul id="R_${usuarios[i].carnet}" class="list-unstyled" onclick="verChatDe(${usuarios[i].carnet})">
      <li style="cursor: pointer;">
          <div class="card border-0">
              <div class="card-body">
                  <h4 class="d-xxl-flex justify-content-xxl-left align-items-xxl-left card-title">${usuarios[i].nombre} [${usuarios[i].carnet}]</h4>
              </div>
          </div>
      </li>
  </ul>`;
      div_receptores.innerHTML += ul_receptor;
    }
  }
}

async function verChatDe(id_Receptor) {
  id_Receptor = id_Receptor.toString();
  const id_Emisor = sessionStorage.getItem("sesion");
  const receptorID = document.getElementById("receptorID");
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  let nodoReceptor = arbolAVL.getNodo(parseInt(id_Receptor));
  receptorID.textContent = "Chat con " + id_Receptor + " "+ nodoReceptor.usuario.nombre;

  //obtener bloques de mensajes en todo el sistema
  const bloques = new Bloque();
  bloques.fromJSON();

  const AreaMensajes = document.getElementById("AreaMensajes");
  AreaMensajes.innerHTML = "";
  
  let inicio = bloques.inicio;

  while(inicio != null){
    if(inicio.valor.transmitter===id_Receptor && inicio.valor.receiver===id_Emisor){
      let decriptMSJ ="";
      try{
        decriptMSJ = await desencriptacion(inicio.valor.message);
      }catch(error){
        console.log(error);
      }
      
      
      let msjReceived = `<li class="my-2">
      <div class="card border border-muted" style="width: 65%;border-top-left-radius: 0px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">
          <div class="card-body text-center p-2">
              <p class="text-start card-text" style="font-size: 1rem;">${decriptMSJ}</p>
              <h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">Fecha : ${inicio.valor.timestamp}</h6>
          </div>
      </div>
    </li>`;
      AreaMensajes.innerHTML += msjReceived;
    }else if(inicio.valor.transmitter===id_Emisor && inicio.valor.receiver===id_Receptor){
      let decriptMSJ ="";
      try{
        decriptMSJ = await desencriptacion(inicio.valor.message);
      }catch(error){
        console.log(error);
      }
      
      let msjSended = `<li class="d-flex justify-content-end my-2">
      <div class="card border border-muted" style="width: 65%;border-top-left-radius: 20px;border-top-right-radius: 0px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">
          <div class="card-body text-center p-2">
              <p class="text-start card-text" style="font-size: 1rem;">${decriptMSJ}</p>
              <h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">Fecha : ${inicio.valor.timestamp}</h6>
          </div>
      </div>
    </li>`;
      AreaMensajes.innerHTML += msjSended;
    }
    inicio = inicio.siguiente;
  }
}

const btn_enviarMensaje = document.getElementById("enviarMensaje");
const txt_Mensaje_Enviar = document.getElementById("txt_Mensaje_Enviar");
//tecla enter para txt_Mensaje_Enviar llama a enviarMensaje
txt_Mensaje_Enviar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    enviarMensaje();
  }
});

btn_enviarMensaje.addEventListener("click", enviarMensaje);

async function enviarMensaje() {
  const chat_id_Emisor = document.getElementById("chat_id_Emisor");
  const receptorID = document.getElementById("receptorID");

  let id_Emisor = chat_id_Emisor.textContent
    .split(" ")[2]
    .replace("[", "")
    .replace("]", "");

  let id_Receptor = receptorID.textContent.split(" ")[2];

  const txtMensaje = document.getElementById("txt_Mensaje_Enviar");
  let mensaje = txtMensaje.value;

  if (mensaje !== "") {
    //si existe en el localstorage bloque, cargar antes y luego insertar. Si no existe, crear
    if (
      localStorage.getItem("bloques") !== "null" &&
      localStorage.getItem("bloques") !== null
    ) {
      const bloque = new Bloque();
      await bloque.fromJSON();
      await bloque.insertarBloque(
        fechaActual(),
        id_Emisor,
        id_Receptor,
        mensaje
      );
      await bloque.toJSON();
    } else {
      const bloque = new Bloque();
      await bloque.insertarBloque(
        fechaActual(),
        id_Emisor,
        id_Receptor,
        mensaje
      );
      bloque.toJSON();
    }
  }
  txtMensaje.value = "";
  verChatDe(id_Receptor);
}

function fechaActual() {
  let cadena = "";
  const fechaActual = new Date();
  cadena +=
    fechaActual.getDate() < 10
      ? "0" + fechaActual.getDate() + "-"
      : fechaActual.getDate() + "-";
  cadena +=
    fechaActual.getMonth() < 10
      ? "0" + (fechaActual.getMonth() + 1) + "-"
      : fechaActual.getMonth() + "-";
  cadena += fechaActual.getFullYear() + "::";
  cadena +=
    fechaActual.getHours() < 10
      ? "0" + fechaActual.getHours() + ":"
      : fechaActual.getHours() + ":";
  cadena +=
    fechaActual.getMinutes() < 10
      ? "0" + fechaActual.getMinutes() + ":"
      : fechaActual.getMinutes() + ":";
  cadena +=
    fechaActual.getSeconds() < 10
      ? "0" + fechaActual.getSeconds()
      : fechaActual.getSeconds();
  return cadena;
}

export { verChatDe };
export default refrescarTabla;
