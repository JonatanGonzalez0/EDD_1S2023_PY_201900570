class nodoArbolNario {
  constructor(nombreCarpeta, id) {
    this.siguiente = null;
    this.nombreCarpeta = nombreCarpeta;
    this.primero = null;
    this.id = id;
  }
}

export default class arbolNArio {
  constructor() {
    this.raiz = new nodoArbolNario("/", 0);
    this.nodo_creados = 1;
  }

  buscarDirectorio(rutaActual) {
    //si la rutaActual es / no se busca nada retorna 2
    if (rutaActual === "/") {
      return 2;
    }

    //comprobar si existe directorio Ej: /home/usuario
    let lista_carpeta = rutaActual.split("/");
    let aux = this.raiz.primero;
    let contador = 0;
    while (aux) {
      if (aux.nombreCarpeta === lista_carpeta[1]) {
        contador++;
        break;
      }
      aux = aux.siguiente;
    }
    if (contador === 0) {
      //si llega aqui es porque no existe el directorio
      return 1;
    } else {
      let aux2 = aux.primero;
      let contador2 = 0;
      for (let i = 2; i < lista_carpeta.length; i++) {
        while (aux2) {
          if (aux2.nombreCarpeta === lista_carpeta[i]) {
            contador2++;
            break;
          }
          aux2 = aux2.siguiente;
        }
        if (contador2 === 0) {
          return 1;
        }
        aux2 = aux2.primero;
      }
      //si llega aqui es porque existe el directorio
      return 2;
    }
  }

  eliminarNodos(carpetaEliminar) {
    // Recorrer todos los nodos hijos (subcarpetas y archivos)
    let nodo = carpetaEliminar.primero;
    while (nodo) {
      if (nodo.esCarpeta) {
        // Si el nodo es una carpeta, llamar recursivamente a esta función para eliminar todos sus hijos
        this.eliminarNodos(nodo);
      }
      // Eliminar el nodo
      if (carpetaEliminar.primero === nodo) {
        carpetaEliminar.primero = nodo.siguiente;
      } else {
        let temp = carpetaEliminar.primero;
        while (temp.siguiente !== nodo) {
          temp = temp.siguiente;
        }
        temp.siguiente = nodo.siguiente;
      }
      nodo = nodo.siguiente;
    }
  }

  eliminarCarpeta(carpeta, rutaPadre) {
    // Buscar la carpeta padre de la que se quiere eliminar
    let padre = this.obtenerNodo(rutaPadre);
    if (!padre) {
      console.log("No se encontró la carpeta padre");
      return 1;
    }

    // Buscar la carpeta que se quiere eliminar
    let carpetaEliminar = padre.primero;
    while (carpetaEliminar) {
      if (carpetaEliminar.nombreCarpeta === carpeta) {
        break;
      }
      carpetaEliminar = carpetaEliminar.siguiente;
    }
    if (!carpetaEliminar) {
      console.log("No se encontró la carpeta a eliminar");
      return 1;
    }

    // Eliminar todos los nodos que pertenecen a la carpeta
    this.eliminarNodos(carpetaEliminar);

    // Eliminar la carpeta
    if (padre.primero === carpetaEliminar) {
      padre.primero = carpetaEliminar.siguiente;
    } else {
      let temp = padre.primero;
      while (temp.siguiente !== carpetaEliminar) {
        temp = temp.siguiente;
      }

      temp.siguiente = carpetaEliminar.siguiente;
    }
    this.actualizarContadorNodos();
    return 2;
  }

  buscarCarpetaPadre(lista_carpeta) {
    if (lista_carpeta.length === 2) {
      return this.raiz;
    }
    //mismo procedimiento que BuscarCarpeta pero retornando el nodo padre
    //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
    if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
      let aux = this.raiz.primero;
      while (aux) {
        if (aux.nombreCarpeta === carpeta_nueva) {
          return 1;
        }
        aux = aux.siguiente;
      }
      return 2;
    }
    //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
    else if (lista_carpeta[1] === "" && this.raiz.primero === null) {
      return 5;
    }
    //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
    else if (lista_carpeta[1] !== "" && this.raiz.primero === null) {
      return 3;
    }
    //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
    else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
      let aux = this.raiz.primero;
      let nivel = lista_carpeta.length;
      let posicion = 1;
      for (var i = 1; i < nivel; i++) {
        if (aux !== null) {
          while (aux) {
            if (
              posicion < lista_carpeta.length &&
              lista_carpeta[posicion] === aux.nombreCarpeta
            ) {
              posicion++;
              if (aux.primero !== null && posicion < lista_carpeta.length) {
                aux = aux.primero;
              }
              break;
            } else {
              aux = aux.siguiente;
            }
          }
        } else {
          break;
        }
      }
      if (aux !== null) {
        aux = aux.primero;
        while (aux) {
          if (aux.nombreCarpeta === carpeta_nueva) {
            return 1;
          }
          aux = aux.siguiente;
        }
        return 2;
      } else {
        return 4;
      }
    }
  }

  //funcion para obtener el nodo de la ruta especificada. return nodo o null
  obtenerNodo(ruta) {
    if (ruta === "/") {
      return this.raiz;
    }
    let lista_carpeta = ruta.split("/");
    let aux = this.raiz.primero;
    let nivel = lista_carpeta.length;
    let posicion = 1;
    for (var i = 1; i < nivel; i++) {
      if (aux !== null) {
        while (aux) {
          if (
            posicion < lista_carpeta.length &&
            lista_carpeta[posicion] === aux.nombreCarpeta
          ) {
            posicion++;
            if (aux.primero !== null && posicion < lista_carpeta.length) {
              aux = aux.primero;
            }
            break;
          } else {
            aux = aux.siguiente;
          }
        }
      } else {
        break;
      }
    }
    return aux;
  }

  actualizarContadorNodos() {
    //contar nodos del arbol si el nodo tiene hijos se sumara el contador de nodos creados por cada hijo que tenga y el mismo tambien se sumara al contador de nodos creados
    let aux = this.raiz.primero;
    let contador = 0;
    while (aux) {
      contador++;
      if (aux.primero !== null) {
        let aux2 = aux.primero;
        while (aux2) {
          contador++;
          aux2 = aux2.siguiente;
        }
      }
      aux = aux.siguiente;
    }
    this.nodo_creados = contador + 1;
  }

  BuscarCarpeta(carpeta_nueva, lista_carpeta) {
    //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
    if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
      let aux = this.raiz.primero;
      while (aux) {
        if (aux.nombreCarpeta === carpeta_nueva) {
          return 1;
        }
        aux = aux.siguiente;
      }
      return 2;
    }
    //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
    else if (lista_carpeta[1] === "" && this.raiz.primero === null) {
      return 5;
    }
    //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
    else if (lista_carpeta[1] !== "" && this.raiz.primero === null) {
      return 3;
    }
    //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
    else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
      let aux = this.raiz.primero;
      let nivel = lista_carpeta.length;
      let posicion = 1;
      for (var i = 1; i < nivel; i++) {
        if (aux !== null) {
          while (aux) {
            if (
              posicion < lista_carpeta.length &&
              lista_carpeta[posicion] === aux.nombreCarpeta
            ) {
              posicion++;
              if (aux.primero !== null && posicion < lista_carpeta.length) {
                aux = aux.primero;
              }
              break;
            } else {
              aux = aux.siguiente;
            }
          }
        } else {
          break;
        }
      }
      if (aux !== null) {
        aux = aux.primero;
        while (aux) {
          if (aux.nombreCarpeta === carpeta_nueva) {
            return 1;
          }
          aux = aux.siguiente;
        }
        return 2;
      } else {
        return 4;
      }
    }
  }
  //Funcion solo para ordenar la lista de hijos cuando el padre posee varios hijos
  insertarOrdenado(raiz, nuevoNodo) {
    let piv = raiz.primero;
    if (nuevoNodo.nombreCarpeta < raiz.primero.nombreCarpeta) {
      nuevoNodo.siguiente = raiz.primero;
      raiz.primero = nuevoNodo;
      return raiz;
    } else {
      while (piv.siguiente) {
        if (
          nuevoNodo.nombreCarpeta > piv.nombreCarpeta &&
          nuevoNodo.nombreCarpeta < piv.siguiente.nombreCarpeta
        ) {
          nuevoNodo.siguiente = piv.siguiente;
          piv.siguiente = nuevoNodo;
          return raiz;
        } else if (nuevoNodo.nombreCarpeta < piv.nombreCarpeta) {
          nuevoNodo.siguiente = piv;
          piv = nuevoNodo;
          return raiz;
        } else {
          piv = piv.siguiente;
        }
      }
      piv.siguiente = nuevoNodo;
      return raiz;
    }
  }
  // /usac/prueba -> prueba1 /usac/prueba(prueba1)

  comprobarSiExisteId(id, nodo = this.raiz) {
    if (nodo.id === id) {
      return true;
    }
    if (nodo.primero !== null) {
      let aux = nodo.primero;
      while (aux) {
        if (this.comprobarSiExisteId(id, aux)) {
          return true;
        }
        aux = aux.siguiente;
      }
    }
    return false;
  }
  
  insertarHijos(carpeta_nueva, lista_carpeta) {
    /**
     * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
     */
    var id = this.nodo_creados;
    var comprobador = true;

    while (comprobador) {
      if (this.comprobarSiExisteId(id)) {
        id++;
      } else {
        comprobador = false;
      }
    }

    const nuevoNodo = new nodoArbolNario(carpeta_nueva, id);
    this.nodo_creados++;
    //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
    if (lista_carpeta[1] === "" && this.raiz.primero === null) {
      this.raiz.primero = nuevoNodo;
    }
    //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
    else if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
      this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo);
    }
    //Corroboramos si la insercion es en algun directorio que no es la raiz
    else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
      let aux = this.raiz.primero;
      let nivel = lista_carpeta.length;
      let posicion = 1;
      //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
      for (var i = 1; i < nivel; i++) {
        if (aux !== null) {
          while (aux) {
            //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
            if (
              posicion < lista_carpeta.length &&
              lista_carpeta[posicion] === aux.nombreCarpeta
            ) {
              posicion++;
              //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
              if (aux.primero !== null && posicion < lista_carpeta.length) {
                aux = aux.primero;
              }
              break;
            } else {
              aux = aux.siguiente;
            }
          }
        } else {
          break;
        }
      }
      //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
      if (aux.primero === null) {
        aux.primero = nuevoNodo;
      } else {
        aux = this.insertarOrdenado(aux, nuevoNodo);
      }
    }
  }
  /**
   * 1 - Carpeta ya existe
   * 2 - la carpeta no existe
   * 3 - El directorio no es correcto o no es valido
   * 4 - Directorio no valido
   * 5 - No existe ninguna carpeta en la raiz
   *
   */
  insertarRuta(ruta, carpeta_nueva) {
    let lista_carpeta = ruta.split("/");
    let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta);
    switch (existe_carpeta) {
      case 1:
        //crear carpeta con el nombre de la copia_carpeta
        this.insertarRuta(ruta, "copia_" + carpeta_nueva);
        break;
      case 2:
        this.insertarHijos(carpeta_nueva, lista_carpeta);
        alert("La carpeta se creo correctamente");

        break;
      case 3:
        alert("La ruta actual no existe");
        break;
      case 4:
        alert("La ruta actual no es valida");
        break;
      case 5:
        this.insertarHijos(carpeta_nueva, lista_carpeta);
        alert("La carpeta se creo correctamente");
        break;
    }
  }

  grafica_arbol() {
    var cadena = "";
    if (!(this.raiz === null)) {
      cadena = "digraph arbol{ ";
      cadena = cadena + this.retornarValoresArbol(this.raiz);
      cadena = cadena + "}";
    } else {
      cadena = "digraph G { arbol }";
    }
    return cadena;
  }

  /** le mando el parametro primero y solo recorre los siguientes*/
  retornarValoresArbol(raiz) {
    var cadena = "node[shape=record] ";
    let nodo = 1;
    let nodo_padre = 0;
    cadena +=
      "nodo" + nodo_padre + '[label="' + this.raiz.nombreCarpeta + '"] ';
    cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre);
    cadena += this.conexionRamas(this.raiz.primero, 0);
    return cadena;
  }

  valoresSiguietes(raiz, nodo, nodo_padre) {
    let cadena = "";
    let aux = raiz;
    let nodo_padre_aumento = nodo_padre;
    if (aux !== null) {
      while (aux) {
        cadena += "nodo" + aux.id + '[label="' + aux.nombreCarpeta + '"] ';
        aux = aux.siguiente;
      }
      aux = raiz;
      while (aux) {
        nodo_padre_aumento++;
        cadena += this.valoresSiguietes(
          aux.primero,
          this.nodo_creados,
          nodo_padre_aumento
        );
        aux = aux.siguiente;
      }
    }
    return cadena;
  }

  conexionRamas(raiz, padre) {
    let cadena = "";
    let aux = raiz;
    if (aux !== null) {
      while (aux) {
        cadena += "nodo" + padre + " -> nodo" + aux.id + " ";
        aux = aux.siguiente;
      }
      aux = raiz;
      while (aux) {
        cadena += this.conexionRamas(aux.primero, aux.id);
        aux = aux.siguiente;
      }
    }
    return cadena;
  }
  /*
    funcion que retorna cadena para insertar a cuerpo de tabla en html con las carpetas dentro de una ruta

    estructura de la fila
    <tr>
      <td>Documentos</td>
      <td>Tipo: Carpeta</td>
    </tr>
  */
  retornarCuerpoTabla(ruta) {
    let nodo_padre = this.obtenerNodo(ruta);
    let aux = nodo_padre.primero;
    let cadena = "";
    while (aux) {
      cadena += "<tr><td>" + aux.nombreCarpeta + "</td><td>Carpeta</td></tr>";
      aux = aux.siguiente;
    }
    return cadena;
  }

  toJSON() {
    const json = {};
    function nodeToJSON(node) {
      if (node === null) {
        return null;
      }

      //variables a guardar
      var nombreCarpeta = node.nombreCarpeta;
      var id = node.id;
      var primero = node.primero;
      var siguiente = node.siguiente;

      //retornar json
      return {
        nombreCarpeta: nombreCarpeta,
        id: id,
        primero: nodeToJSON(primero),
        siguiente: nodeToJSON(siguiente),
      };
    }

    json.raiz = nodeToJSON(this.raiz);
    json.nodos_creados = this.nodo_creados;
    return json;
  }

  fromJSON(json) {
    function nodeFromJSON(node) {
      if (node === null) {
        return null;
      }
      const newNode = new nodoArbolNario(node.nombreCarpeta, node.id);
      newNode.primero = nodeFromJSON(node.primero);
      newNode.siguiente = nodeFromJSON(node.siguiente);
      return newNode;
    }

    this.raiz = nodeFromJSON(json.raiz);
    this.nodo_creados = json.nodos_creados;
  }
}
