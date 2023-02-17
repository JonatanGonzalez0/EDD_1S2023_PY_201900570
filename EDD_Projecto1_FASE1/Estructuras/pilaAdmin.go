package estructuras

type PilaAdmin struct {
	Inicio   *NodoAdmin
	Fin      *NodoAdmin
	Longitud int
}

// constructor
func Nueva_PilaAdmin() *PilaAdmin {
	pila := new(PilaAdmin)
	pila.Inicio = nil
	pila.Fin = nil
	pila.Longitud = 0
	return pila
}

// apilar
func (pila *PilaAdmin) Apilar(tipo string, estudiante *Estudiante, fecha string, hora string) {
	nuevo := Nuevo_NodoAdmin(tipo, estudiante, fecha, hora)
	if pila.Inicio == nil {
		pila.Inicio = nuevo
		pila.Fin = nuevo
		pila.Longitud++
	} else {
		nuevo.Siguiente = pila.Inicio
		pila.Inicio.Anterior = nuevo
		pila.Inicio = nuevo
		pila.Longitud++
	}
}

// desapilar
func (pila *PilaAdmin) Desapilar() *NodoAdmin {
	if pila.Inicio == nil {
		pila.Longitud = 0
		return nil
	} else {
		nodo := pila.Inicio
		pila.Inicio = pila.Inicio.Siguiente
		pila.Longitud--
		return nodo
	}
}