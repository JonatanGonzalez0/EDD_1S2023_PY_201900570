package estructuras

type NodoCola struct {
	Estudiante *Estudiante
	Siguiente  *NodoCola
}

// constructor
func Nuevo_NodoCola(estudiante *Estudiante) *NodoCola {
	return &NodoCola{Estudiante: estudiante, Siguiente: nil}
}
