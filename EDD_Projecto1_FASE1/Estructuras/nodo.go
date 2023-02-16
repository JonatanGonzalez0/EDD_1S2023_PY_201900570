package estructuras

type Nodo struct {
	Estudiante *Estudiante
	Siguiente  *Nodo
	Anterior   *Nodo
}

// constructor
func Nuevo_Nodo(estudiante *Estudiante) *Nodo {
	return &Nodo{Estudiante: estudiante, Siguiente: nil, Anterior: nil}
}
