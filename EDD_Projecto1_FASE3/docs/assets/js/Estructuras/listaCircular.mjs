class nodoCircular {
    constructor(accion, nombre, fecha,hora) {
        this.accion = accion;
        this.nombre = nombre;
        this.fecha = fecha;
        this.hora = hora;
        this.siguiente = null;
    }

    toJSON() {
        return {
            accion: this.accion,
            nombre: this.nombre,
            fecha: this.fecha,
            hora: this.hora
        }
    }
}

export default class listaCircular {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    agregar(accion, nombre, fecha, hora) {
        const nuevoNodo = new nodoCircular(accion, nombre, fecha, hora);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
            nuevoNodo.siguiente = this.cabeza;
        } else {
            this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
            this.cola.siguiente = this.cabeza;
        }
    }

    eliminar(nombre) {
        if (!this.cabeza) {
            return;
        }

        let nodoActual = this.cabeza;
        let nodoAnterior = null;

        do {
            if (nodoActual.nombre === nombre) {
                if (nodoActual === this.cabeza) {
                    this.cabeza = this.cabeza.siguiente;
                    this.cola.siguiente = this.cabeza;
                } else if (nodoActual === this.cola) {
                    this.cola = nodoAnterior;
                    this.cola.siguiente = this.cabeza;
                } else {
                    nodoAnterior.siguiente = nodoActual.siguiente;
                }

                return true;
            }

            nodoAnterior = nodoActual;
            nodoActual = nodoActual.siguiente;
        } while (nodoActual !== this.cabeza);

        return false;
    }

    recorrer() {
        if (!this.cabeza) {
            return;
        }

        let nodoActual = this.cabeza;

        do {
            console.log(nodoActual.toJSON());
            nodoActual = nodoActual.siguiente;
        } while (nodoActual !== this.cabeza);
    }

    toJSON() {
        const listaJSON = [];

        if (!this.cabeza) {
            return listaJSON;
        }

        let nodoActual = this.cabeza;

        do {
            listaJSON.push(nodoActual.toJSON());
            nodoActual = nodoActual.siguiente;
        } while (nodoActual !== this.cabeza);

        return listaJSON;
    }

    fromJSON(listaJSON) {
        for (const nodoJSON of listaJSON) {
            this.agregar(nodoJSON.accion, nodoJSON.nombre, nodoJSON.fecha, nodoJSON.hora);
        }
    }
    
    reporte() {
        let lista = this;
        let dot = 'digraph ListaCircular {';
        dot += 'graph [label="Lista Circular(Bitácora)", splines=ortho, nodesep=0.8,fontcolor=white];'
        dot += 'bgcolor = "gray35";';
        dot += 'node [style=filled, fillcolor=skyblue];'
        dot += 'edge [arrowhead=vee,color=white];';
    
    
        if (!lista.cabeza) {
            dot += '}\n';
            return dot;
        }

        let contadorNodos = 0;

        let nodoActual = lista.cabeza;
        //crea los nodos
        do {
            dot += `nodo${contadorNodos} [label="Accion: ${nodoActual.accion} \\n${nodoActual.nombre} \\nFecha: ${nodoActual.fecha} \\nHora: ${nodoActual.hora}", shape=box];`;
            nodoActual = nodoActual.siguiente;
            contadorNodos++;
        } while (nodoActual !== lista.cabeza);

        contadorNodos = 0;
        //crea los enlaces de la cabeza a la cola, de la cola solo un enlace a la cabeza
        nodoActual = lista.cabeza;
        do {
            dot += `nodo${contadorNodos} -> nodo${contadorNodos+1};`;
            nodoActual = nodoActual.siguiente;
            contadorNodos++;
        } while (nodoActual !== lista.cola);
        dot += `nodo${contadorNodos} -> nodo0;`;
        
        contadorNodos = 0;
        //crea el mismo rank para todos los nodos
        dot += '{ rank=same; ';
        nodoActual = lista.cabeza;
        do {
            dot += `nodo${contadorNodos};`;
            nodoActual = nodoActual.siguiente;
            contadorNodos++;
        } while (nodoActual !== lista.cabeza);
        dot += '}';
    
        dot += '}';
        
        return dot;
    }
    
    
    
}
