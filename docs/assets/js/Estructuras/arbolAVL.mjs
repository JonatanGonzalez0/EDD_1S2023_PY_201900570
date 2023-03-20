// Clase NodoAVL
class NodoAVL {
  constructor(usuario) {
    this.usuario = usuario;
    this.izquierda = null;
    this.derecha = null;
    this.altura = 1;
  }
}

// Clase AVL
export default class AVL {
  constructor() {
    this.raiz = null;
  }
  
  insertar(usuario) {
    const nuevoNodo = new NodoAVL(usuario);
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }

    this.raiz = this.insertarNodo(this.raiz, nuevoNodo);
    return this;
  }

  insertarNodo(nodoActual, nuevoNodo) {
    if (!nodoActual) return nuevoNodo;

    if (nuevoNodo.usuario.carnet < nodoActual.usuario.carnet) {
      nodoActual.izquierda = this.insertarNodo(nodoActual.izquierda, nuevoNodo);
    }
    else {
      nodoActual.derecha = this.insertarNodo(nodoActual.derecha, nuevoNodo);
    }

    nodoActual.altura = 1 + Math.max(this.altura(nodoActual.izquierda), this.altura(nodoActual.derecha));

    const balance = this.getBalance(nodoActual);

    // Left Left Case
    if (balance > 1 && nuevoNodo.usuario.carnet < nodoActual.izquierda.usuario.carnet) {
      return this.rotacionDerecha(nodoActual);
    }

    // Right Right Case
    if (balance < -1 && nuevoNodo.usuario.carnet > nodoActual.derecha.usuario.carnet) {
      return this.rotacionIzquierda(nodoActual);
    }

    // Left Right Case
    if (balance > 1 && nuevoNodo.usuario.carnet > nodoActual.izquierda.usuario.carnet) {
      nodoActual.izquierda = this.rotacionIzquierda(nodoActual.izquierda);
      return this.rotacionDerecha(nodoActual);
    }

    // Right Left Case
    if (balance < -1 && nuevoNodo.usuario.carnet < nodoActual.derecha.usuario.carnet) {
      nodoActual.derecha = this.rotacionDerecha(nodoActual.derecha);
      return this.rotacionIzquierda(nodoActual);
    }

    return nodoActual;
  }
  
  altura(nodo) {
    if (!nodo) return 0;
    return nodo.altura;
  }

  getBalance(nodo) {
    if (!nodo) return 0;
    return this.altura(nodo.izquierda) - this.altura(nodo.derecha);
  }

  rotacionDerecha(nodo) {
    const nodoIzquierda = nodo.izquierda;
    const nodoIzquierdaDerecha = nodoIzquierda.derecha;

    nodoIzquierda.derecha = nodo;
    nodo.izquierda = nodoIzquierdaDerecha;

    nodo.altura = 1 + Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha));
    nodoIzquierda.altura = 1 + Math.max(this.altura(nodoIzquierda.izquierda), this.altura(nodoIzquierda.derecha));
    return nodoIzquierda;
  }

  rotacionIzquierda(nodo) {
    const nodoDerecha = nodo.derecha;
    const nodoDerechaIzquierda = nodoDerecha.izquierda;

    nodoDerecha.izquierda = nodo;
    nodo.derecha = nodoDerechaIzquierda;

    nodo.altura = 1 + Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha));
    nodoDerecha.altura = 1 + Math.max(this.altura(nodoDerecha.izquierda), this.altura(nodoDerecha.derecha));
    return nodoDerecha;
  }

  //funcion para recorrer el arbol en preorden
  preOrden() {
    let resultado = [];
    const recorrer = (nodo) => {
      resultado.push(nodo.usuario.carnet);
      if (nodo.izquierda) recorrer(nodo.izquierda);
      if (nodo.derecha) recorrer(nodo.derecha);
    };
    recorrer(this.raiz);
    return resultado;
  }

  //funcion para recorrer el arbol en inorden
  inOrden() {
    let resultado = [];
    const recorrer = (nodo) => {
      if (nodo.izquierda) recorrer(nodo.izquierda);
      resultado.push(nodo.usuario.carnet);
      if (nodo.derecha) recorrer(nodo.derecha);
    };
    recorrer(this.raiz);
    return resultado;
  }

  //funcion para recorrer el arbol en postorden
  postOrden() {
    let resultado = [];
    const recorrer = (nodo) => {
      if (nodo.izquierda) recorrer(nodo.izquierda);
      if (nodo.derecha) recorrer(nodo.derecha);
      resultado.push(nodo.usuario.carnet);
    };
    recorrer(this.raiz);
    return resultado;
  }

  comprobarLogin(carnet, password) {
    let resultado = false;
    const recorrer = (nodo) => {
      if (nodo.usuario.carnet == carnet && nodo.usuario.password == password) { 
        resultado = true;
      }
      if (nodo.izquierda) recorrer(nodo.izquierda);
      if (nodo.derecha) recorrer(nodo.derecha);
    };
    recorrer(this.raiz);
    return resultado;
  }

  toJSON() {
    const json = {};

    function nodeToJSON(node){
      if(!node) return null;
      return {
        valor: node.usuario,
        altura: node.altura,
        izquierda: nodeToJSON(node.izquierda),
        derecha: nodeToJSON(node.derecha)
      };
    }

    json.raiz = nodeToJSON(this.raiz);
    return JSON.stringify(json);
  }

  fromJSON(json) {
    const obj = JSON.parse(json);

    function jsonToNode(jsonNode){
      if(!jsonNode) return null;
      const node = new NodoAVL(jsonNode.valor);
      node.altura = jsonNode.altura;
      node.izquierda = jsonToNode(jsonNode.izquierda);
      node.derecha = jsonToNode(jsonNode.derecha);
      return node;
    }

    this.raiz = jsonToNode(obj.raiz);
  }

  toGraphviz() {
    let resultado = "digraph G {\n\tnode [shape=record, style=filled, fillcolor=skyblue];\n";
    const recorrer = (nodo) => {
      resultado += `\t${nodo.usuario.carnet} [label="Carnet: ${nodo.usuario.carnet} \\n Nombre: ${nodo.usuario.nombre} \\n Altura: ${nodo.altura}"];\n`;
      if (nodo.izquierda) {
        resultado += `\t${nodo.usuario.carnet} -> ${nodo.izquierda.usuario.carnet}\n`;
        recorrer(nodo.izquierda);
      }
      if (nodo.derecha) {
        resultado += `\t${nodo.usuario.carnet} -> ${nodo.derecha.usuario.carnet}\n`;
        recorrer(nodo.derecha);
      }
    };
    recorrer(this.raiz);
    resultado += "}";
    return resultado;
  }
  
}