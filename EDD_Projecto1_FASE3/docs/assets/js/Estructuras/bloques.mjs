import { desencriptacion, encriptacion } from "../Utils/encriptacionAES.mjs";

class nodoBloque {
  constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash) {
    this.valor = {
      index: index,
      timestamp: fecha,
      transmitter: emisor,
      receiver: receptor,
      message: mensaje,
      previoushash: previousHash,
      hash: hash,
    };
    this.siguiente = null;
    this.anterior = null;
  }
}

export default class Bloque {
  constructor() {
    this.inicio = null;
    this.bloques_creados = 0;
  }

  async insertarBloque(fecha, emisor, receptor, mensaje) {
    if (this.inicio === null) {
      let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje;
      let hash = await this.sha256(cadena);
      let mensajeEncriptado = await encriptacion(mensaje);
      const nuevoBloque = new nodoBloque(
        this.bloques_creados,
        fecha,
        emisor,
        receptor,
        mensajeEncriptado,
        "0000",
        hash
      );
      this.inicio = nuevoBloque;
      this.bloques_creados++;
    } else {
      let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje;
      let hash = await this.sha256(cadena);
      let mensajeEncriptado = await encriptacion(mensaje);
      let aux = this.inicio;
      while (aux.siguiente) {
        aux = aux.siguiente;
      }
      const nuevoBloque = new nodoBloque(
        this.bloques_creados,
        fecha,
        emisor,
        receptor,
        mensajeEncriptado,
        aux.valor["hash"],
        hash
      );
      nuevoBloque.anterior = aux;
      aux.siguiente = nuevoBloque;
      this.bloques_creados++;
    }
  }

  async sha256(mensaje) {
    let cadenaFinal;
    const enconder = new TextEncoder();
    const mensajeCodificado = enconder.encode(mensaje);
    await crypto.subtle
      .digest("SHA-256", mensajeCodificado)
      .then((result) => {
        // 100 -> 6a
        const hashArray = Array.from(new Uint8Array(result));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        cadenaFinal = hashHex;
      })
      .catch((error) => console.log(error));
    return cadenaFinal;
  }

  toJSON() {
    const bloques = [];
    let aux = this.inicio;
    while (aux) {
      bloques.push({
        index: aux.valor.index,
        timestamp: aux.valor.timestamp,
        transmitter: aux.valor.transmitter,
        receiver: aux.valor.receiver,
        message: aux.valor.message,
        previoushash: aux.valor.previoushash,
        hash: aux.valor.hash,
      });
      aux = aux.siguiente;
    }
    const result = {
      bloques,
      bloques_creados: this.bloques_creados,
    };
    localStorage.setItem("bloques", JSON.stringify(result));
  }

  fromJSON() {
    let result = JSON.parse(localStorage.getItem("bloques"));
    if (result) {
      this.inicio = new nodoBloque(
        result.bloques[0].index,
        result.bloques[0].timestamp,
        result.bloques[0].transmitter,
        result.bloques[0].receiver,
        result.bloques[0].message,
        result.bloques[0].previoushash,
        result.bloques[0].hash
      );
      let aux = this.inicio;
      for (let i = 1; i < result.bloques.length; i++) {
        let nuevoBloque = new nodoBloque(
          result.bloques[i].index,
          result.bloques[i].timestamp,
          result.bloques[i].transmitter,
          result.bloques[i].receiver,
          result.bloques[i].message,
          result.bloques[i].previoushash,
          result.bloques[i].hash
        );
        nuevoBloque.anterior = aux;
        aux.siguiente = nuevoBloque;
        aux = aux.siguiente;
      }
      this.bloques_creados = result.bloques_creados;
    }
  }

  getBloqueByIndex(index) {
    let aux = this.inicio;
    while (aux) {
      if (aux.valor.index === index) {
        return aux;
      }
      aux = aux.siguiente;
    }
    return null;
  }

  toGraphviz() {
    let cadena = "digraph G {";
    cadena += 'graph [label="Bloques blockchain", labelloc=t, fontsize=20];';
    cadena +=
      "node [shape=record, fontsize=20, style=filled, fillcolor=lightblue];";
    cadena += "edge [arrowhead=vee, color=white, fontsize=20];";
    cadena += 'bgcolor = "gray35";';

    let aux = this.inicio;
    while (aux) {
      cadena +=
        "nodo" +
        aux.valor.index +
        '[label="{Timestamp: ' +
        aux.valor.timestamp +
        " | Emisor: " +
        aux.valor.transmitter +
        " | Receptor: " +
        aux.valor.receiver +
        " | Hash: " +
        aux.valor.hash +
        " | PreviousHash: " +
        aux.valor.previoushash +
        '}"];';
      if (aux.siguiente) {
        cadena +=
          "nodo" +
          aux.valor.index +
          "-> nodo" +
          aux.siguiente.valor.index +
          ";";
      }
      aux = aux.siguiente;
    }
    cadena += "}";
    return cadena;
  }
}
