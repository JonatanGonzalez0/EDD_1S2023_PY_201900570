class nodoMatrizAdyacencia {
  constructor(valor) {
    this.siguiente = null;
    this.abajo = null;
    this.valor = valor;
  }
}

export default class grafoDirigido {
  constructor() {
    this.principal = null;
  }
  convertirAGrafo(arbolCarpetas) {
    /**
     * Ejemplo de retorno cada ruta con sus carpetas dentro arbolcarpetas
     * {
        "/": [
            "carpeta1",
            "carpeta2",
            "carpeta3"
        ],
        "/carpeta1": [
            "carpeta1.1",
            "carpeta1.2",
            "carpeta1.3"
        ],
        "/carpeta2": [
            "carpeta2.1",
            "carpeta2.2",
            "carpeta2.3"
        ],
        "/carpeta3": [
            "carpeta3.1",
            "carpeta3.2",
            "carpeta3.3"
        ],
        "/carpeta1/carpeta1.1": [
            "carpeta1.1.1",
            "carpeta1.1.2",
            "carpeta1.1.3"
        ],
        "/carpeta1/carpeta1.2": [
            "carpeta1.2.1",
            "carpeta1.2.2",
            "carpeta1.2.3"
        ]   
        }

     */
    let retorno = arbolCarpetas.obtenerCarpetas();
    //por cada ruta en retorno se inserta en el grafo
    for (let ruta in retorno) {
      //hijos debera ser una cadena separada por comas de los hijos de la ruta
      let hijos = "";
      for (let i = 0; i < retorno[ruta].length; i++) {
        hijos += retorno[ruta][i] + ",";
      }
      hijos = hijos.substring(0, hijos.length - 1);
      if (hijos !== ""){
        this.insertarValores(ruta, hijos);
      }
    }
    
  }

  insertarF(texto) {
    const nuevoNodo = new nodoMatrizAdyacencia(texto);
    if (this.principal === null) {
      this.principal = nuevoNodo;
    } else {
      let aux = this.principal;
      while (aux.abajo) {
        if (aux.valor === nuevoNodo.valor) {
          return;
        }
        aux = aux.abajo;
      }
      aux.abajo = nuevoNodo;
    }
  }

  insertarC(padre, hijo) {
    const nuevoNodo = new nodoMatrizAdyacencia(hijo);
    if (this.principal !== null && this.principal.valor === padre) {
      let aux = this.principal;
      while (aux.siguiente) {
        aux = aux.siguiente;
      }
      aux.siguiente = nuevoNodo;
    } else {
      this.insertarF(padre);
      let aux = this.principal;
      while (aux) {
        if (aux.valor === padre) {
          break;
        }
        aux = aux.abajo;
      }
      if (aux !== null) {
        while (aux.siguiente) {
          aux = aux.siguiente;
        }
        aux.siguiente = nuevoNodo;
      }
    }
  }

  insertarValores(padre, hijos) {
    let cadena = hijos.split(",");
    for (let i = 0; i < cadena.length; i++) {
      this.insertarC(padre, cadena[i]);
    }
  }

  //Reporte modificado para trabajar con carpetas
  grafica() {
    let cadena =
      'graph grafoDirigido{graph [label="Grafo Dirigido", nodesep=2,fontcolor=white]; bgcolor = "gray35";edge [color=white]; node[style=filled,fillcolor=skyblue]; rankdir=LR; node [shape=box]; "/"; node [shape = ellipse] ; layout=neato; ';
    let auxPadre = this.principal;
    let auxHijo = this.principal;
    let peso = 0;
    while (auxPadre) {
      auxHijo = auxPadre.siguiente;
      let profundidad = auxPadre.valor.split("/");
      let padre = "";
      if (profundidad.length == 2 && profundidad[1] == "") {
        peso = 1;
      } else if (profundidad.length == 2 && profundidad[1] != "") {
        peso = 2;
      } else {
        peso = profundidad.length;
      }
      if (auxPadre.valor != "/") {
        padre = profundidad[profundidad.length - 1];
      } else {
        padre = "/";
      }
      while (auxHijo) {
        cadena +=
          '"' +
          padre +
          '"' +
          " -- " +
          '"' +
          auxHijo.valor +
          '"' +
          ' [label="' +
          peso +
          '"] ';
        auxHijo = auxHijo.siguiente;
      }
      auxPadre = auxPadre.abajo;
    }
    cadena += "}";
    return cadena;
  }

}