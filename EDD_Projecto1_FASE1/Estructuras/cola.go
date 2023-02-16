package estructuras

type Cola struct {
	Inicio   *NodoCola
	Fin      *NodoCola
	Longitud int
}

// constructor
func Nueva_Cola() *Cola {
	cola := new(Cola)
	cola.Inicio = nil
	cola.Fin = nil
	cola.Longitud = 0
	return cola
}

// encola
func (cola *Cola) Encolar(estudiante *Estudiante) {
	nuevo := Nuevo_NodoCola(estudiante)
	if cola.Inicio == nil {
		cola.Inicio = nuevo
		cola.Fin = nuevo
		cola.Longitud++
	} else {
		cola.Fin.Siguiente = nuevo
		cola.Fin = nuevo
		cola.Longitud++
	}
}

// desencolar
func (cola *Cola) Desencolar() *Estudiante {
	if cola.Inicio == nil {
		cola.Longitud = 0
		return nil
	} else {
		estudiante := cola.Inicio.Estudiante
		cola.Inicio = cola.Inicio.Siguiente
		cola.Longitud--
		return estudiante
	}
}

// esta vacia
func (cola *Cola) EstaVacia() bool {
	return cola.Inicio == nil
}

// obtener inicio
func (cola *Cola) ObtenerInicio() *Estudiante {
	if cola.Inicio == nil {
		return nil
	} else {
		return cola.Inicio.Estudiante
	}
}

// obtener f
func (cola *Cola) ObtenerFin() *Estudiante {
	if cola.Fin == nil {
		return nil
	} else {
		return cola.Fin.Estudiante
	}
}

// get longitud
func (cola *Cola) GetLongitud() int {
	return cola.Longitud
}
