// Clase NodoAVL
class NodoAVL {
  constructor(usuario) {
    this.usuario = usuario;
    this.izquierdo = null;
    this.derecho = null;
    this.altura = 1;
  }
}

// Clase AVL
export default class AVL {
  constructor() {
    this.raiz = null;
  }

  // Función para obtener la altura de un nodo
  altura(nodo) {
    if (!nodo) {
      return 0;
    }
    return nodo.altura;
  }

  // Función para obtener el balance de un nodo
  balance(nodo) {
    if (!nodo) {
      return 0;
    }
    return this.altura(nodo.izquierdo) - this.altura(nodo.derecho);
  }

  // Función para rotar a la derecha un nodo
  rotacionDerecha(nodo) {
    const nuevoPadre = nodo.izquierdo;
    const temp = nuevoPadre.derecho;

    nuevoPadre.derecho = nodo;
    nodo.izquierdo = temp;

    nodo.altura =
      Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1;
    nuevoPadre.altura =
      Math.max(
        this.altura(nuevoPadre.izquierdo),
        this.altura(nuevoPadre.derecho)
      ) + 1;

    return nuevoPadre;
  }

  // Función para rotar a la izquierda un nodo
  rotacionIzquierda(nodo) {
    const nuevoPadre = nodo.derecho;
    const temp = nuevoPadre.izquierdo;

    nuevoPadre.izquierdo = nodo;
    nodo.derecho = temp;

    nodo.altura =
      Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1;
    nuevoPadre.altura =
      Math.max(
        this.altura(nuevoPadre.izquierdo),
        this.altura(nuevoPadre.derecho)
      ) + 1;

    return nuevoPadre;
  }

  // Función para insertar un nodo en el árbol
  insertar(usuario) {
    const nodo = new NodoAVL(usuario);

    // Si el árbol está vacío, el nuevo nodo es la raíz
    if (!this.raiz) {
      this.raiz = nodo;
      return this.raiz;
    }

    // Insertar el nodo de forma recursiva y actualizar la altura
    this.raiz = this._insertar(this.raiz, nodo);

    return this.raiz;
  }

  // Función auxiliar para insertar un nodo de forma recursiva
  _insertar(nodoActual, nodoNuevo) {
    // Insertar el nodo en el lugar correcto del árbol
    if (!nodoActual) {
      return nodoNuevo;
    }

    if (nodoNuevo.usuario.carnet < nodoActual.usuario.carnet) {
      nodoActual.izquierdo = this._insertar(nodoActual.izquierdo, nodoNuevo);
    } else if (nodoNuevo.usuario.carnet > nodoActual.usuario.carnet) {
      nodoActual.derecho = this._insertar(nodoActual.derecho, nodoNuevo);
    } else {
      // Si el carnet ya existe, no se hace nada
      return nodoActual;
    }

    // Actualizar la altura del nodo actual
    nodoActual.altura =
      Math.max(
        this.altura(nodoActual.izquierdo),
        this.altura(nodoActual.derecho)
      ) + 1;

    // Obtener el balance del nodo actual
    const balance = this.balance(nodoActual);

    // Si el nodo está desbalanceado, aplicar una rotación
    if (
      balance > 1 &&
      nodoNuevo.usuario.carnet < nodoActual.izquierdo.usuario.carnet
    ) {
      // Rotación derecha
      return this.rotacionDerecha(nodoActual);
    }

    if (
      balance < -1 &&
      nodoNuevo.usuario.carnet > nodoActual.derecho.usuario.carnet
    ) {
      // Rotación izquierda
      return this.rotacionIzquierda(nodoActual);
    }

    if (
      balance > 1 &&
      nodoNuevo.usuario.carnet > nodoActual.izquierdo.usuario.carnet
    ) {
      // Rotación doble izquierda
      nodoActual.izquierdo = this.rotacionIzquierda(nodoActual.izquierdo);
      return this.rotacionDerecha(nodoActual);
    }

    if (
      balance < -1 &&
      nodoNuevo.usuario.carnet < nodoActual.derecho.usuario.carnet
    ) {
      // Rotación doble derecha
      nodoActual.derecho = this.rotacionDerecha(nodoActual.derecho);
      return this.rotacionIzquierda(nodoActual);
    }

    return nodoActual;
  }

  // Función para buscar un nodo en el árbol
  buscar(carnet) {
    let nodoActual = this.raiz;
    while (nodoActual) {
      if (carnet < nodoActual.usuario.carnet) {
        nodoActual = nodoActual.izquierdo;
      } else if (carnet > nodoActual.usuario.carnet) {
        nodoActual = nodoActual.derecho;
      } else {
        return nodoActual;
      }
    }

    return null;
  }

  // Función para convertir el árbol en una cadena JSON
  toJSON() {
    const json = {};

    // Función auxiliar para convertir cada nodo en un objeto
    function nodeToJSON(node) {
      if (!node) {
        return null;
      }

      return {
        valor: node.usuario,
        altura: node.altura,
        izquierdo: nodeToJSON(node.izquierdo),
        derecho: nodeToJSON(node.derecho),
      };
    }

    // Convertir la raíz a un objeto JSON
    json.raiz = nodeToJSON(this.raiz);

    // Devolver la cadena JSON
    return JSON.stringify(json);
  }

  // Función para cargar un árbol desde una cadena JSON
  fromJSON(json) {
    const obj = JSON.parse(json);

    // Función auxiliar para crear cada nodo a partir del objeto JSON
    function jsonToNode(jsonNode) {
      if (!jsonNode) {
        return null;
      }

      const node = new NodoAVL(jsonNode.valor);
      node.altura = jsonNode.altura;
      node.izquierdo = jsonToNode(jsonNode.izquierdo);
      node.derecho = jsonToNode(jsonNode.derecho);
      return node;
    }

    // Crear la raíz a partir del objeto JSON
    this.raiz = jsonToNode(obj.raiz);
  }

  //funcion para generar el dot del arbol AVL
  // Función para generar una cadena en formato DOT que represente al árbol AVL
  generarDot() {
    const header = "digraph G {\n  rankdir=TB;\n";
    const footer = "}\n";
    const dot = header + this.generarDotRecursivo(this.raiz) + footer;
    return dot;
  }

  // Función auxiliar recursiva para generar la cadena en formato DOT
  generarDot() {
    let dot = "digraph G {\n";

    // Función para recorrer el árbol en orden de altura y agregar los nodos al grafo DOT
    function enOrdenAltura(nodo) {
      if (nodo) {
        enOrdenAltura(nodo.izquierdo);
        dot += `  "${nodo.usuario.carnet}" [label="${nodo.usuario.carnet} \\n ${nodo.usuario.nombre} \\n Altura: ${nodo.altura}", shape=square];\n`;
        enOrdenAltura(nodo.derecho);
      }
    }

    enOrdenAltura(this.raiz);

    // Recorrer el árbol en preorden y agregar las relaciones entre los nodos al grafo DOT
    function preorden(nodo) {
      if (nodo) {
        if (nodo.izquierdo) {
          dot += `  "${nodo.usuario.carnet}" -> "${nodo.izquierdo.usuario.carnet}" [label="L"];\n`;
        }
        if (nodo.derecho) {
          dot += `  "${nodo.usuario.carnet}" -> "${nodo.derecho.usuario.carnet}" [label="R"];\n`;
        }
        preorden(nodo.izquierdo);
        preorden(nodo.derecho);
      }
    }

    preorden(this.raiz);
    dot += "}\n";

    return dot;
  }
}
