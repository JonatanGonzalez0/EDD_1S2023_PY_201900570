package estructuras

type NodoAdmin struct {
	tipo       string
	Estudiante *Estudiante
	fecha      string
	hora       string

	Siguiente *NodoAdmin
	Anterior  *NodoAdmin
}

// constructor
func Nuevo_NodoAdmin(tipo string, estudiante *Estudiante, fecha string, hora string) *NodoAdmin {
	return &NodoAdmin{tipo: tipo, Estudiante: estudiante, fecha: fecha, hora: hora, Siguiente: nil, Anterior: nil}
}

