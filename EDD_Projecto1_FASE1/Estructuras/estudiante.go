package estructuras

type Estudiante struct {
	nombre              string
	apellido            string
	carnet              int
	password            string
	Bitacora            *PilaAdmin
	Bitacora_Estudiante *PilaEstudiante
}

// construct
func Nuevo_Estudiante(nombre string, apellido string, carnet int, password string) *Estudiante {
	return &Estudiante{nombre: nombre, apellido: apellido, carnet: carnet, password: password, Bitacora: Nueva_PilaAdmin(), Bitacora_Estudiante: Nueva_PilaEstudiante()}
}

// setters y getter
func (estudiante *Estudiante) GetNombre() string {
	return estudiante.nombre
}

func (estudiante *Estudiante) SetNombre(nombre string) {
	estudiante.nombre = nombre
}

func (estudiante *Estudiante) GetApellido() string {
	return estudiante.apellido
}

func (estudiante *Estudiante) SetApellido(apellido string) {
	estudiante.apellido = apellido
}

func (estudiante *Estudiante) GetCarnet() int {
	return estudiante.carnet
}

func (estudiante *Estudiante) SetCarnet(carnet int) {
	estudiante.carnet = carnet
}

func (estudiante *Estudiante) GetPassword() string {
	return estudiante.password
}

func (estudiante *Estudiante) SetPassword(password string) {
	estudiante.password = password
}
