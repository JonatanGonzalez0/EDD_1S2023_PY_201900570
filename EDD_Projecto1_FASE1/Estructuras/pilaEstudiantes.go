package estructuras

type NodoPilaEstudiante struct {
	operacion string
	fecha     string
	hora      string

	Siguiente *NodoPilaEstudiante
	Anterior  *NodoPilaEstudiante
}

// constructor
func Nuevo_NodoPilaEstudiante(operacion string, fecha string, hora string) *NodoPilaEstudiante {
	return &NodoPilaEstudiante{operacion: operacion, fecha: fecha, hora: hora, Siguiente: nil, Anterior: nil}
}

type PilaEstudiante struct {
	Inicio   *NodoPilaEstudiante
	Fin      *NodoPilaEstudiante
	Longitud int
}

// constructor
func Nueva_PilaEstudiante() *PilaEstudiante {
	pila := new(PilaEstudiante)
	pila.Inicio = nil
	pila.Fin = nil
	pila.Longitud = 0
	return pila
}

// apilar
func (pila *PilaEstudiante) Apilar(operacion string, fecha string, hora string) {
	nuevo := Nuevo_NodoPilaEstudiante(operacion, fecha, hora)
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
func (pila *PilaEstudiante) Desapilar() *NodoPilaEstudiante {
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

// gets
func (pila *PilaEstudiante) GetInicio() *NodoPilaEstudiante {
	return pila.Inicio
}

func (pila *PilaEstudiante) GetFin() *NodoPilaEstudiante {
	return pila.Fin
}

func (pila *PilaEstudiante) GetLongitud() int {
	return pila.Longitud
}

// get operacion
func (nodo *NodoPilaEstudiante) GetOperacion() string {
	return nodo.operacion
}

// get fecha
func (nodo *NodoPilaEstudiante) GetFecha() string {
	return nodo.fecha
}

// get hora
func (nodo *NodoPilaEstudiante) GetHora() string {
	return nodo.hora
}
