import AVL from "../Estructuras/arbolAVL.mjs";
import refrescarTabla from "./cargaInicial.mjs";
import { generarMatriz } from "../Reports/reporteUsuarios.mjs";

function generarNuevaCarpeta() {
  let nombrecarpeta = document.getElementById("txt-carpeta-nueva").value;
  if (nombrecarpeta === "") {
    return;
  }

  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));

  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);

  let rutaBuscada = document.getElementById("inputBusqueda").value;

  nodoUsuario.arbolCarpetas.insertarRuta(rutaBuscada, nombrecarpeta);

  //nodoUsuario insertar Accion,nombre,fecha dd/mm/YYYY,hora hh:mm:ss
  let fecha = new Date();
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();
  let hora = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();
  let fechaActual = dia + "/" + mes + "/" + anio;
  let horaActual = hora + ":" + minutos + ":" + segundos;

  let accion = "Se creó carpeta";
  let nombre = nombrecarpeta;

  nodoUsuario.bitacora.agregar(accion, nombre, fechaActual, horaActual);

  //guardar arbol avl
  localStorage.setItem("arbolAVL", arbolAVL.toJSON());
  //refrescar tabla
  refrescarTabla();
  //limpiar input
  document.getElementById("txt-carpeta-nueva").value = "";
}

//crear nueva carpeta en el directorio actual
let btn_nueva_carpeta = document.getElementById("btn-nuevaCarpeta");
btn_nueva_carpeta.addEventListener("click", generarNuevaCarpeta);

const txtNuevaCarpeta = document.getElementById("txt-carpeta-nueva");
//detectar el evento enter llamar a la funcion generarNuevaCarpeta
txtNuevaCarpeta.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btn-nuevaCarpeta").click();
  }
});

//txt-busqueda id inputBusqueda detectar el evento enter
const inputBusqueda = document.getElementById("inputBusqueda");

inputBusqueda.addEventListener("keyup", function (event) {
  //si se presiona enter
  if (event.keyCode === 13) {
    //obtener la ruta buscada en el input inputBusqueda
    let rutaBuscada = document.getElementById("inputBusqueda").value;
    //obtener el carnet del usuario actual tipo entero
    let carnet = parseInt(sessionStorage.getItem("sesion"));
    //obtener arbol avl
    let arbolAVL = new AVL();
    arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

    //obtener el nodo del usuario actual
    let nodoUsuario = arbolAVL.getNodo(carnet);

    var existeDir = nodoUsuario.arbolCarpetas.buscarDirectorio(rutaBuscada);
    if (existeDir === 1) {
      //swal  directorio no valido + rutaBuscada
      swal("El directorio no es válido", rutaBuscada, "error");
    } else {
      document.getElementById("txt-carpeta-actual").value = rutaBuscada;
      refrescarTabla();
    }
  }
});

/* funcion para eliminar una carpeta */
function eliminarCarpeta() {
  //swet alert para confirmar la eliminacion
  swal({
    title: "¿Está seguro de eliminar la carpeta?",
    text: "Una vez eliminada no se podrá recuperar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      //obtener el carnet del usuario actual tipo entero
      let carnet = parseInt(sessionStorage.getItem("sesion"));
      let arbolAVL = new AVL();
      arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
      //obtener el nodo del usuario actual
      let nodoUsuario = arbolAVL.getNodo(carnet);
      let nombreCarpeta = document.getElementById("txt-carpeta-eliminar").value;
      let ruta = document.getElementById("txt-carpeta-actual").value;

      if (ruta == "") {
        ruta = "/";
      }

      let carpetaEliminada = nodoUsuario.arbolCarpetas.eliminarCarpeta(
        nombreCarpeta,
        ruta
      );

      if (carpetaEliminada == 1) {
        //alerta de que la carpeta no existe
        swal("La carpeta no existe", {
          icon: "error",
        });
      }
      if (carpetaEliminada == 2) {
        //nodoUsuario insertar Accion,nombre,fecha dd/mm/YYYY,hora hh:mm:ss
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let fechaActual = dia + "/" + mes + "/" + anio;
        let horaActual = hora + ":" + minutos + ":" + segundos;

        let accion = "Se eliminó carpeta";
        let nombre = nombreCarpeta;

        nodoUsuario.bitacora.agregar(accion, nombre, fechaActual, horaActual);

        //ACTUALIZAR ARBOL AVL
        localStorage.setItem("arbolAVL", arbolAVL.toJSON());
        //refrescarTabla
        refrescarTabla();

        //alerta de eliminacion exitosa
        swal("La carpeta fue eliminada exitosamente", {
          icon: "success",
        });
      }
    } else {
      swal("La carpeta no fue eliminada");
    }
  });
}

const btnEliminarCarpeta = document.getElementById("btn-eliminarCarpeta");
btnEliminarCarpeta.addEventListener("click", eliminarCarpeta);

const txtEliminarCarpeta = document.getElementById("txt-carpeta-eliminar");
//detectar el evento enter llamar a la funcion eliminarCarpeta
txtEliminarCarpeta.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btn-eliminarCarpeta").click();
  }
});

//const id subida-archivos
const subidaArchivos = document.getElementById("subida-archivos");
subidaArchivos.addEventListener("change", function () {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  const arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  //obtener el nodo del usuario actual
  const nodoUsuario = arbolAVL.getNodo(carnet);
  //obtener la ruta actual
  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  // Obtener los archivos seleccionados
  let archivos = subidaArchivos.files;

  // Recorrer la lista de archivos y procesarlos uno por uno
  for (let i = 0; i < archivos.length; i++) {
    let archivo = archivos[i];
    let nombre_archivo = archivo.name;

    // Leer el archivo como un objeto FileReader
    let lector_archivo = new FileReader();

    // Definir el evento a ejecutar cuando la lectura del archivo esté completa
    lector_archivo.onload = function () {
      // Obtener el contenido en formato base64
      let contenido_base64 = lector_archivo.result;
      //insertar archivo en la matriz
      nodoCarpeta.matriz.insertarArchivo(nombre_archivo, contenido_base64);
      //guardar arbol avl
      try {
        //nodoUsuario insertar Accion,nombre,fecha dd/mm/YYYY,hora hh:mm:ss
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let fechaActual = dia + "/" + mes + "/" + anio;
        let horaActual = hora + ":" + minutos + ":" + segundos;

        let accion = "Se creó archivo";
        let nombre = nombre_archivo;

        nodoUsuario.bitacora.agregar(accion, nombre, fechaActual, horaActual);
        //ACTUALIZAR ARBOL AVL Y GUARDAR EN LOCAL STORAGE
        localStorage.setItem("arbolAVL", arbolAVL.toJSON());
      } catch (e) {
        //sweat alert "El archivo es muy grande para ser guardado en local storage"
        swal("El archivo es muy grande para ser guardado en local storage", {
          icon: "error",
        });
      }
      //refrescar tabla
      refrescarTabla();
    };
    // Iniciar la lectura del archivo como base64
    lector_archivo.readAsDataURL(archivo);
  }
  //limpiar el input file
  subidaArchivos.value = "";

  //SWEET ALERT "Archivos subidos exitosamente"
  swal("Archivos subidos exitosamente", {
    icon: "success",
  });
});

const btnDarPermiso = document.getElementById("btn-darPermiso");
btnDarPermiso.addEventListener("click", function () {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);
  //obtener la ruta actual
  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  let nombre_ArchivoDarPermiso = document.getElementById(
    "dropdown-btn-archivos"
  ).textContent;
  let carnetUsuario = document.getElementById("dropdown-btn").textContent;
  let nodoReceiver = arbolAVL.getNodo(parseInt(carnetUsuario));
  //carpeta compartidos de nodo receiver
  let carpetaCompartidos = nodoReceiver.arbolCarpetas.obtenerNodo("/Compartidos Conmigo");

  let nodoArchivo = nodoCarpeta.matriz.getNodoArchivo(nombre_ArchivoDarPermiso);
  
  carpetaCompartidos.matriz.insertarArchivo(nodoArchivo.nombre, nodoArchivo.contenido);

  //comprobar si formCheck-Write esta checked
  var formCheckWrite = document.getElementById("formCheck-Write");
  var formCheckRead = document.getElementById("formCheck-Read");
  var tipoPermiso = "";

  if (formCheckWrite.checked && formCheckRead.checked) {
    tipoPermiso = "r - w";
  } else if (formCheckWrite.checked && !formCheckRead.checked) {
    tipoPermiso = "w";
  } else if (!formCheckWrite.checked && formCheckRead.checked) {
    tipoPermiso = "r";
  } else {
    //sweat alert "No se selecciono ningun permiso"
    swal("No se selecciono ningun permiso", {
      icon: "error",
    });
    return;
  }

  var seDioPermiso = nodoCarpeta.matriz.darPermiso(
    carnetUsuario,
    nombre_ArchivoDarPermiso,
    tipoPermiso
  );
  //sediopermiso puede ser true o false
  if (seDioPermiso) {
    try {
      //guardar arbol avl
      localStorage.setItem("arbolAVL", arbolAVL.toJSON());

      // Obtener los permisos ya existentes en el local storage
      if (localStorage.getItem("permisos") != null) {
        let permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
        // Agregar el nuevo permiso al arreglo
        
        let nuevoPermiso = {
          propietario: carnet,
          destino: parseInt(carnetUsuario),
          ubicacion: rutaActual,
          nombreArchivo: nombre_ArchivoDarPermiso,
          tipoPermiso: tipoPermiso,
        };
        permisos.push(nuevoPermiso);
        // Guardar el arreglo en el local storage
        localStorage.setItem("permisos", JSON.stringify(permisos));
      } else {
        // Crear el arreglo de permisos
        let permisos = [];
        // Agregar el nuevo permiso al arreglo
        let nuevoPermiso = {
          propietario: carnet,
          destino: parseInt(carnetUsuario),
          ubicacion: rutaActual,
          nombreArchivo: nombre_ArchivoDarPermiso,
          tipoPermiso: tipoPermiso,
        };
        permisos.push(nuevoPermiso);
        // Guardar el arreglo en el local storage
        localStorage.setItem("permisos", JSON.stringify(permisos));
      }
    } catch (e) {
      //sweat alert No se pudo dar permiso
      swal("No se pudo dar permiso", {
        icon: "error",
      });
    }
    generarMatriz();

    if (tipoPermiso == "r - w") {
      tipoPermiso = "Lectura y Escritura";
    } else if (tipoPermiso == "w") {
      tipoPermiso = "Escritura";
    } else if (tipoPermiso == "r") {
      tipoPermiso = "Lectura";
    }
    swal({
      title: "Archivo: " + nombre_ArchivoDarPermiso,
      text:
        "Se le dio permiso de " +
        tipoPermiso +
        " al usuario con carnet: " +
        carnetUsuario,
      icon: "success",
    });
    //desmarcar los checkbox
    formCheckWrite.checked = false;
    formCheckRead.checked = false;

    //actualizar los dropdown
    document.getElementById("dropdown-btn-archivos").textContent =
      "Seleccione un archivo";
    document.getElementById("dropdown-btn").textContent =
      "Seleccione un usuario";
  } else {
    //sweat alert No se pudo dar permiso
    swal("No se pudo dar permiso", {
      icon: "error",
    });
  }
});

function obtenerRuta(carpeta) {
  let dicActual = document.getElementById("txt-carpeta-actual").value;
  let rutaBuscada = "";

  if (dicActual != "/") {
    rutaBuscada = dicActual + "/" + carpeta;
  } else {
    rutaBuscada = dicActual + carpeta;
  }

  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);

  var existeDir = nodoUsuario.arbolCarpetas.buscarDirectorio(rutaBuscada);
  if (existeDir === 1) {
    //swal  directorio no valido + rutaBuscada
    swal("El directorio no es válido", rutaBuscada, "error");
  } else {
    document.getElementById("inputBusqueda").value = rutaBuscada;
    document.getElementById("txt-carpeta-actual").value = rutaBuscada;
    refrescarTabla();
  }
}

function putEliminar(nombreCarpeta) {
  //le coloca al input eliminar carpeta el nombre de la carpeta que se va a eliminar
  document.getElementById("txt-carpeta-eliminar").value = nombreCarpeta;
}

function retorno() {
  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let rutaRetorno = rutaActual.substring(0, rutaActual.lastIndexOf("/"));
  if (rutaRetorno == "") {
    rutaRetorno = "/";
  }
  document.getElementById("txt-carpeta-actual").value = rutaRetorno;
  document.getElementById("inputBusqueda").value = "";
  document.getElementById("txt-carpeta-eliminar").value = "";

  refrescarTabla();
}

function viewFile(nombre_archivo) {
  //obtener el carnet del usuario actual tipo entero
  let carnet = parseInt(sessionStorage.getItem("sesion"));
  //obtener arbol avl
  let arbolAVL = new AVL();
  arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));

  //obtener el nodo del usuario actual
  let nodoUsuario = arbolAVL.getNodo(carnet);

  let rutaActual = document.getElementById("txt-carpeta-actual").value;
  let nodoCarpeta = nodoUsuario.arbolCarpetas.obtenerNodo(rutaActual);

  let NodoArchivo = nodoCarpeta.matriz.getNodoArchivo(nombre_archivo);

  let contenido = NodoArchivo.contenido;

  let nombre = NodoArchivo.nombre;

  let extension = nombre.substring(nombre.lastIndexOf(".") + 1);

  if (extension == "txt") {
    const nameFileView = document.getElementById('nameFileView');
    nameFileView.textContent = "";
    nameFileView.textContent = nombre;

    const TextViewContent = document.getElementById('TextViewContent');
    TextViewContent.textContent = "";

    //convertir contenidobase64 a string 
    contenido = atob(contenido.split(',')[1]);
    TextViewContent.textContent = contenido;

    const RowViewTXT = document.getElementById('RowViewTXT');
    RowViewTXT.style.display = 'block';
    RowViewTXT.classList.remove('visually-hidden');
    RowViewTXT.classList.add('visually-shown');

    const sectionReportes = document.getElementById('sectionReportes');
    //hacer visually-hidden el sectionReportes
    sectionReportes.classList.remove('visually-shown');
    sectionReportes.classList.add('visually-hidden');
  }
  else if (extension == "png" || extension == "jpg" || extension == "jpeg") {
    const imageViewer = document.getElementById('imageViewer');
    //cargar la imagen en base64 a <img>
    imageViewer.src = contenido;
    const RowViewIMG = document.getElementById('RowViewIMG');
    RowViewIMG.classList.remove('visually-hidden');
    RowViewIMG.classList.add('visually-shown');

    const sectionReportes = document.getElementById('sectionReportes');
    //hacer visually-hidden el sectionReportes
    sectionReportes.classList.remove('visually-shown');
    sectionReportes.classList.add('visually-hidden');
  }
  else if (extension == "pdf") {
    const pdfViewer = document.getElementById('pdfViewer');
    //cargar el pdf en base64 a <embed>
    pdfViewer.src = contenido;
    pdfViewer.setAttribute("title", nombre);
    const RowViewPDF = document.getElementById('RowViewPDF');
    RowViewPDF.classList.remove('visually-hidden');
    RowViewPDF.classList.add('visually-shown');

    const sectionReportes = document.getElementById('sectionReportes');
    //hacer visually-hidden el sectionReportes
    sectionReportes.classList.remove('visually-shown');
    sectionReportes.classList.add('visually-hidden');

  }

}

export { putEliminar };
export { obtenerRuta };
export { retorno };
export { viewFile };
