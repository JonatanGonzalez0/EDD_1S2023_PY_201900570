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
  
}

//const bloque = new Bloque()
//let bloque_actual

/*
const btnEnviar = document.getElementById("enviar")
btnEnviar.addEventListener("click", enviarMensaje)

function enviarMensaje(){
    let emisor_mensaje =  document.getElementById("emisor").value
    let receptor_mensaje = document.getElementById("receptor").value
    let mensaje_final = document.getElementById("mensaje").value
    bloque.insertarBloque(fechaActual(),emisor_mensaje,receptor_mensaje,mensaje_final)
    console.log("Mensaje Enviado")
}

 REPORTES 

const btnReporte = document.getElementById("reporte")
btnReporte.addEventListener("click", reporte)

function reporte(){
    bloque_actual = bloque.inicio
    if(bloque_actual != null){
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte1 = document.getElementById("siguiente-bloque")
btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente(){
    if(bloque_actual.siguiente != null){
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte2 = document.getElementById("anterior-bloque")
btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior(){
    if(bloque_actual.anterior != null){
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}
*/
async function mostrar_Mensaje_descriptado() {
  /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
   * mostrar mensaje
   * bloque_actual = abloque_actual.siguiente
   */
  let cadena = await desencriptacion(bloque_actual.valor["message"]);
  document.getElementById("reporte-mensajes").value = cadena;
}

/**
 * Una funcion que lea todo los bloques y simplemente muestre el mensaje
 * al usuario final
 * bloque_actual.valor['receiver'] == 201700918
 * mensaje de  bloque_actual.valor['trasmitter']
 *  ( mensaje_descriptado(carnet, emisor) )
 * 201700918
 *
 */
