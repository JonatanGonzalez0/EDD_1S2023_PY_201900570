class nodoMatriz {
  constructor(posX, posY, nombre_archivo, contenido) {
    this.siguiente = null;
    this.anterior = null;
    this.abajo = null;
    this.arriba = null;
    this.posX = posX;
    this.posY = posY;
    this.posicion = nombre_archivo;
    this.contenido = contenido;
  }
}

export default class Matriz {
  constructor() {
    this.principal = new nodoMatriz(-1, -1, "Raiz", "");
    this.coordenadaY = 0;
    this.coordenadaX = 0;
  }

  buscarF(nombre_archivo) {
    let aux = this.principal;
    while (aux) {
      if (aux.posicion === nombre_archivo) {
        return aux;
      } else {
        aux = aux.abajo;
      }
    }
    return null;
  }

  buscarC(carnet) {
    let aux = this.principal;
    while (aux) {
      if (aux.posicion === carnet) {
        return aux;
      } else {
        aux = aux.siguiente;
      }
    }
    return null;
  }

  insertarColumna(posicion, texto) {
    const nuevoNodo = new nodoMatriz(posicion, -1, texto, "");
    let piv = this.principal;
    let pivA = this.principal;
    while (piv.siguiente) {
      if (nuevoNodo.posX > piv.posX) {
        pivA = piv;
        piv = piv.siguiente;
      } else {
        nuevoNodo.siguiente = piv;
        nuevoNodo.anterior = pivA;
        pivA.siguiente = nuevoNodo;
        piv.anterior = nuevoNodo;
        return;
      }
    }
    nuevoNodo.anterior = piv;
    piv.siguiente = nuevoNodo;
  }

  insertarFila(posicion, texto, contenido) {
    const nuevoNodo = new nodoMatriz(-1, posicion, texto, contenido);
    let piv = this.principal;
    let pivA = this.principal;
    while (piv.abajo) {
      if (nuevoNodo.posY > piv.posY) {
        pivA = piv;
        piv = piv.abajo;
      } else {
        nuevoNodo.abajo = piv;
        nuevoNodo.arriba = pivA;
        pivA.abajo = nuevoNodo;
        piv.arriba = nuevoNodo;
        return;
      }
    }
    nuevoNodo.arriba = piv;
    piv.abajo = nuevoNodo;
  }

  insertarNodo(x, y, texto) {
    const nuevoNodo = new nodoMatriz(x, y, texto, "");
    let tempX = this.principal;
    let tempY = this.principal;
    //Agregar en Columna
    while (tempX.siguiente) {
      if (tempX.posX === nuevoNodo.posX) {
        break;
      }
      tempX = tempX.siguiente;
    }
    while (true) {
      if (tempX.posY === nuevoNodo.posY) {
        break;
      } else if (tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY) {
        nuevoNodo.abajo = tempX.abajo;
        nuevoNodo.arriba = tempX;
        tempX.abajo = nuevoNodo;
        break;
      } else if (tempX.abajo === null) {
        nuevoNodo.arriba = tempX;
        nuevoNodo.abajo = tempX.abajo;
        tempX.abajo = nuevoNodo;
        break;
      } else {
        tempX = tempX.abajo;
      }
    }
    //Agregar en Fila
    while (tempY.abajo) {
      if (tempY.posY === nuevoNodo.posY) {
        break;
      }
      tempY = tempY.abajo;
    }
    while (true) {
      if (tempY.posX === nuevoNodo.posX) {
        break;
      } else if (
        tempY.siguiente !== null &&
        tempY.siguiente.posX > nuevoNodo.posX
      ) {
        nuevoNodo.siguiente = tempY.siguiente;
        nuevoNodo.anterior = tempY;
        tempY.siguiente = nuevoNodo;
      } else if (tempY.siguiente === null) {
        nuevoNodo.anterior = tempY;
        nuevoNodo.siguiente = tempY.siguiente;
        tempY.siguiente = nuevoNodo;
      } else {
        tempY = tempY.siguiente;
      }
    }
  }

  insertarArchivo(nombre_archivo, contenido_base64) {
    let nuevaFila = this.buscarF(nombre_archivo);
    if (nuevaFila === null) {
      this.insertarFila(this.coordenadaY, nombre_archivo, contenido_base64);
      this.coordenadaY++;
    } else {
      let copia_archivo = "copia_" + nombre_archivo;
      this.insertarArchivo(copia_archivo, contenido_base64);
    }
  }

  darPermiso(carnet, nombre_archivo, tipoPermiso) {
    let nuevaColumna = this.buscarC(carnet);
    let nuevaFila = this.buscarF(nombre_archivo);
    if (nuevaColumna === null) {
      this.insertarColumna(this.coordenadaX, carnet);
      this.coordenadaX++;
      nuevaColumna = this.buscarC(carnet);
    }
    /*carnet existe y archivo existe*/
    if (nuevaColumna !== null && nuevaFila !== null) {
      this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, tipoPermiso);
      return true;
    }
    return false;
  }

  reporte() {
    let cadena = "";
    let aux1 = this.principal;
    let aux2 = this.principal;
    let aux3 = this.principal;
    if (aux1 !== null) {
      cadena =
        "digraph MatrizPermisos {  node[shape=box]  rankdir=UD;  {rank=min; ";
      /** Creacion de los nodos actuales */
      while (aux1) {
        cadena +=
          "nodo" +
          (aux1.posX + 1) +
          (aux1.posY + 1) +
          '[label="' +
          aux1.posicion +
          '" ,rankdir=LR,group=' +
          (aux1.posX + 1) +
          "]; ";
        aux1 = aux1.siguiente;
      }
      cadena += "}";
      while (aux2) {
        aux1 = aux2;
        cadena += "{rank=same; ";
        while (aux1) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            '[label="' +
            aux1.posicion +
            '" ,group=' +
            (aux1.posX + 1) +
            "]; ";
          aux1 = aux1.siguiente;
        }
        cadena += "}";
        aux2 = aux2.abajo;
      }
      /** Conexiones entre los nodos de la matriz */
      aux2 = aux3;
      while (aux2) {
        aux1 = aux2;
        while (aux1.siguiente) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            " -> " +
            "nodo" +
            (aux1.siguiente.posX + 1) +
            (aux1.siguiente.posY + 1) +
            " [dir=both];";
          aux1 = aux1.siguiente;
        }
        aux2 = aux2.abajo;
      }
      aux2 = aux3;
      while (aux2) {
        aux1 = aux2;
        while (aux1.abajo) {
          cadena +=
            "nodo" +
            (aux1.posX + 1) +
            (aux1.posY + 1) +
            " -> " +
            "nodo" +
            (aux1.abajo.posX + 1) +
            (aux1.abajo.posY + 1) +
            " [dir=both];";
          aux1 = aux1.abajo;
        }
        aux2 = aux2.siguiente;
      }
      cadena += "}";
    } else {
      cadena = "No hay elementos en la matriz";
    }
    return cadena;
  }

  toJSON() {
    const json = {};
    const visitedNodes = new Set();

    function nodeToJSON(node) {
      if (node === null) {
        return null;
      }

      if (visitedNodes.has(node)) {
        // si ya se visitó el nodo, devolver una referencia a él
        return { $ref: node.posicion };
      }

      visitedNodes.add(node);

      var posX = node.posX;
      var posY = node.posY;
      var posicion = node.posicion;
      var contenido = node.contenido;
      var siguiente = nodeToJSON(node.siguiente);
      var anterior = nodeToJSON(node.anterior);
      var arriba = nodeToJSON(node.arriba);
      var abajo = nodeToJSON(node.abajo);

      return {
        posX: posX,
        posY: posY,
        posicion: posicion,
        contenido: contenido,
        siguiente: siguiente,
        anterior: anterior,
        arriba: arriba,
        abajo: abajo,
      };
    }

    json.principal = nodeToJSON(this.principal);
    json.coordenadaY = this.coordenadaY;
    json.coordenadaX = this.coordenadaX;

    return json;
  }

  fromJSON(json) {
    var MAX_DEPTH = 500;
    function nodeFromJSON(node, depth = 0) {
      if (node === null || depth > MAX_DEPTH) {
        return null;
      }

      const nuevoNodo = new nodoMatriz(
        node.posX,
        node.posY,
        node.posicion,
        node.contenido
      );

      if (node.hasOwnProperty("siguiente")) {
        nuevoNodo.siguiente = nodeFromJSON(node.siguiente, depth + 1);
      }

      if (node.hasOwnProperty("anterior")) {
        nuevoNodo.anterior = nodeFromJSON(node.anterior, depth + 1);
      }

      if (node.hasOwnProperty("arriba")) {
        nuevoNodo.arriba = nodeFromJSON(node.arriba, depth + 1);
      }

      if (node.hasOwnProperty("abajo")) {
        nuevoNodo.abajo = nodeFromJSON(node.abajo, depth + 1);
      }

      return nuevoNodo;
    }

    this.principal = nodeFromJSON(json.principal);
    this.coordenadaY = json.coordenadaY;
    this.coordenadaX = json.coordenadaX;
  }

  retornarcuerpoTablaArchivos() {
    //retornara todos los archivos que se encuentran en la matriz
    let cadena = "\n";
    let aux = this.principal;
    try {
      aux = aux.abajo;
    } catch (error) {
      return cadena;
    }
    while (aux) {
      let nombre_archivo="";
      let extension="";
      try{
        nombre_archivo = aux.posicion;
        extension = nombre_archivo.split(".");
      }catch(error){
        return cadena;
      }
    
      extension = extension[1];
      let icon = "";
      let tipo = "";
      if (extension === "txt") {
        icon = `<svg class="bi bi-file-text text-warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="width: 18px;height: 24px;color: rgb(13,224,238);">
        <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"></path>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
    </svg>`;
        tipo = "Texto";
      } else if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "gif" ||
        extension === "bmp" ||
        extension === "svg" ||
        extension === "tiff" ||
        extension === "psd" ||
        extension === "raw" ||
        extension === "heif" ||
        extension === "indd" ||
        extension === "ai" ||
        extension === "eps" ||
        extension === "svg" ||
        extension === "ps"
      ) {
        icon = `<svg class="bi bi-image text-success" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="width: 18px;height: 24px;color: rgb(13,224,238);">
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
    </svg>`;
        tipo = "Imagen";
      } else if (extension === "pdf") {
        icon = `<svg class="bi bi-file-earmark-pdf text-danger" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="width: 18px;height: 24px;color: rgb(13,224,238);">
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"></path>
        <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"></path>
    </svg>`;
        tipo = "PDF";
      }
      cadena +=
        "<tr><td>" +
        icon +
        "  " +
        aux.posicion +
        "</td><td>" +
        tipo +
        "</td></tr>";

      aux = aux.abajo;
    }
    return cadena;
  }

  retornarArchivosDropdown() {
    let aux=null;
    try {
      aux = this.principal.abajo;
    }catch {
      return "";
    }
    let cadena = "";
    while (aux != null) {
      cadena += '<a class="dropdown-item" data-nombre="' + aux.posicion + '">' + aux.posicion + "</a>";
      aux = aux.abajo;
    }
    return cadena;
  }
}
