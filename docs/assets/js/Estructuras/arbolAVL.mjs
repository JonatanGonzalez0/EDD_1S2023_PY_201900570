import arbolNario from "./arbolNario.mjs";

// Clase NodoAVL
class NodoAVL {
  constructor(usuario) {
    this.usuario = usuario;
    this.izquierda = null;
    this.derecha = null;
    this.altura = 1;
    this.arbolCarpetas = new arbolNario();
  }
}

// Clase AVL
export default class AVL {
  constructor() {
    this.raiz = null;
  }

  insertar(usuario) {
    //validar que el usuario no exista si existe, sobreescribirlo
    const nodo = this.buscarNodo(this.raiz, usuario.carnet);
    if (nodo) {
      nodo.usuario = usuario;
      return this;
    }

    const nuevoNodo = new NodoAVL(usuario);
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }

    this.raiz = this.insertarNodo(this.raiz, nuevoNodo);
    return this;
  }

  //insertar nuevo nodo al arbol AVL
  insertarNodo(nodoActual, nuevoNodo) {
    if (!nodoActual) return nuevoNodo;

    if (nuevoNodo.usuario.carnet < nodoActual.usuario.carnet) {
      nodoActual.izquierda = this.insertarNodo(nodoActual.izquierda, nuevoNodo);
    } else {
      nodoActual.derecha = this.insertarNodo(nodoActual.derecha, nuevoNodo);
    }

    nodoActual.altura =
      1 +
      Math.max(
        this.altura(nodoActual.izquierda),
        this.altura(nodoActual.derecha)
      );

    const balance = this.getBalance(nodoActual);

    //rotacion simple izquierda
    if (
      balance > 1 &&
      nuevoNodo.usuario.carnet < nodoActual.izquierda.usuario.carnet
    ) {
      return this.rotacionSimpleDerecha(nodoActual);
    }

    //rotacion simple derecha
    if (
      balance < -1 &&
      nuevoNodo.usuario.carnet > nodoActual.derecha.usuario.carnet
    ) {
      return this.rotacionSimpleIzquierda(nodoActual);
    }

    //rotacion doble izquierda
    if (
      balance > 1 &&
      nuevoNodo.usuario.carnet > nodoActual.izquierda.usuario.carnet
    ) {
      nodoActual.izquierda = this.rotacionSimpleIzquierda(nodoActual.izquierda);
      return this.rotacionSimpleDerecha(nodoActual);
    }

    //rotacion doble derecha
    if (
      balance < -1 &&
      nuevoNodo.usuario.carnet < nodoActual.derecha.usuario.carnet
    ) {
      return this.rotacionSimpleIzquierda(nodoActual);
    }

    return nodoActual;
  }

  //funcion getBalance
  getBalance(nodo) {
    if (!nodo) return 0;
    return this.altura(nodo.izquierda) - this.altura(nodo.derecha);
  }

  //funcion altura
  altura(nodo) {
    if (!nodo) return 0;
    return nodo.altura;
  }

  //funcion rotacion simple derecha
  rotacionSimpleDerecha(nodo) {
    const nodoIzquierda = nodo.izquierda;
    const nodoIzquierdaDerecha = nodoIzquierda.derecha;

    nodoIzquierda.derecha = nodo;
    nodo.izquierda = nodoIzquierdaDerecha;

    nodo.altura =
      1 + Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha));
    nodoIzquierda.altura =
      1 +
      Math.max(
        this.altura(nodoIzquierda.izquierda),
        this.altura(nodoIzquierda.derecha)
      );

    return nodoIzquierda;
  }

  //funcion rotacion simple izquierda
  rotacionSimpleIzquierda(nodo) {
    const nodoDerecha = nodo.derecha;
    const nodoDerechaIzquierda = nodoDerecha.izquierda;

    nodoDerecha.izquierda = nodo;
    nodo.derecha = nodoDerechaIzquierda;

    nodo.altura =
      1 + Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha));
    nodoDerecha.altura =
      1 +
      Math.max(
        this.altura(nodoDerecha.izquierda),
        this.altura(nodoDerecha.derecha)
      );

    return nodoDerecha;
  }

  //funcion buscar nodo
  buscarNodo(nodoActual, carnet) {
    if (!nodoActual) return null;
    if (carnet === nodoActual.usuario.carnet) return nodoActual;
    if (carnet < nodoActual.usuario.carnet)
      return this.buscarNodo(nodoActual.izquierda, carnet);
    return this.buscarNodo(nodoActual.derecha, carnet);
  }

  getNodo(carnet) {
    return this.buscarNodo(this.raiz, carnet);
  }

  //funcion para recorrer el arbol en preorden
  preOrden() {
    let resultado = [];
    const recorrer = (nodo) => {
      resultado.push(nodo.usuario);
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
      resultado.push(nodo.usuario);
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
      resultado.push(nodo.usuario);
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

    function nodeToJSON(node) {
      if (!node) return null;
      return {
        usuario: node.usuario,
        arbolCarpetas: node.arbolCarpetas.toJSON(),
        altura: node.altura,
        izquierda: nodeToJSON(node.izquierda),
        derecha: nodeToJSON(node.derecha),
      };
    }

    json.raiz = nodeToJSON(this.raiz);
    return JSON.stringify(json);
  }

  fromJSON(json) {
    const obj = JSON.parse(json);

    function jsonToNode(jsonNode) {
      if (!jsonNode) return null;
      const node = new NodoAVL(jsonNode.usuario);

      node.arbolCarpetas = new arbolNario();
      node.arbolCarpetas.fromJSON(jsonNode.arbolCarpetas);

      node.altura = jsonNode.altura;
      node.izquierda = jsonToNode(jsonNode.izquierda);
      node.derecha = jsonToNode(jsonNode.derecha);
      return node;
    }

    this.raiz = jsonToNode(obj.raiz);
  }

  //funcion para retornar valores del arbol
  retornarValoresArbol(raiz, id) {
    var cadena = "";
    var numero = id + 1;
    if (raiz !== null) {
      cadena += '"' + raiz.usuario.carnet + '" ';
      if (!(raiz.izquierda === null) && !(raiz.derecha === null)) {
        //crear nodos raiz izquierda y derecha
        cadena += '"' + raiz.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.usuario.carnet +
          "\\n" +
          raiz.usuario.nombre +
          "\\nAltura: " +
          raiz.altura +
          '"];';

        cadena += '"' + raiz.izquierda.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.izquierda.usuario.carnet +
          "\\n" +
          raiz.izquierda.usuario.nombre +
          "\\nAltura: " +
          raiz.izquierda.altura +
          '"];';

        cadena += '"' + raiz.derecha.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.derecha.usuario.carnet +
          "\\n" +
          raiz.derecha.usuario.nombre +
          "\\nAltura: " +
          raiz.derecha.altura +
          '"];';

        cadena += '"';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += this.retornarValoresArbol(raiz.izquierda, numero);
        cadena += '"';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += this.retornarValoresArbol(raiz.derecha, numero);
        cadena +=
          "{rank=same" +
          '"' +
          raiz.izquierda.usuario.carnet +
          '"' +
          " -> " +
          '"' +
          raiz.derecha.usuario.carnet +
          '"' +
          " [style=invis]}; ";
      } else if (!(raiz.izquierda === null) && raiz.derecha === null) {
        //crear nodos raiz izquierda y derecha
        cadena += '"' + raiz.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.usuario.carnet +
          "\\n" +
          raiz.usuario.nombre +
          "\\nAltura: " +
          raiz.altura +
          '"];';

        cadena += '"' + raiz.izquierda.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.izquierda.usuario.carnet +
          "\\n" +
          raiz.izquierda.usuario.nombre +
          "\\nAltura: " +
          raiz.izquierda.altura +
          '"];';

        //nodo invisible
        cadena += " x" + numero + ' [label="",width=.1,style=invis];';
        cadena += '"';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += this.retornarValoresArbol(raiz.izquierda, numero);
        cadena += '"';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += "x" + numero + "[style=invis]";
        cadena +=
          "{rank=same" +
          '"' +
          raiz.izquierda.usuario.carnet +
          '"' +
          " -> " +
          "x" +
          numero +
          " [style=invis]}; ";
      } else if (raiz.izquierda === null && !(raiz.derecha === null)) {
        //crear nodos raiz izquierda y derecha
        cadena += '"' + raiz.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.usuario.carnet +
          "\\n" +
          raiz.usuario.nombre +
          "\\nAltura: " +
          raiz.altura +
          '"];';

        cadena += '"' + raiz.derecha.usuario.carnet + '" ';
        cadena +=
          '[label="' +
          raiz.derecha.usuario.carnet +
          "\\n" +
          raiz.derecha.usuario.nombre +
          "\\nAltura: " +
          raiz.derecha.altura +
          '"];';

        cadena += " x" + numero + ' [label="",width=.1,style=invis];';
        cadena += '"';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += "x" + numero + "[style=invis]";
        cadena += '; "';
        cadena += raiz.usuario.carnet;
        cadena += '" -> ';
        cadena += this.retornarValoresArbol(raiz.derecha, numero);
        cadena +=
          "{rank=same" +
          " x" +
          numero +
          ' -> "' +
          raiz.derecha.usuario.carnet +
          '"' +
          " [style=invis]}; ";
      }
    }
    return cadena;
  }
  toGraphviz() {
    var cadena = "";
    if (this.raiz !== null) {
      cadena += "digraph AVL {";
      cadena += 'bgcolor = "gray";';
      cadena += "node [style=filled, fillcolor=skyblue];";
      cadena += this.retornarValoresArbol(this.raiz, 0);
      cadena += "}";
    }
    return cadena;
  }
}
