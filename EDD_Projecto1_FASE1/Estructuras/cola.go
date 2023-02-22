package estructuras

import (
	"fmt"
	"log"
	"os"
	"os/exec"
)

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

// crear reporte en graphviz de la cola pendientes Carnet\n Nombre Apellido
func (cola *Cola) ReporteGraphviz() {
	//get absolute path of the file
	abspath, _ := os.Getwd()
	path_reportes := abspath + "\\Reportes"
	//create file

	aux := cola.Inicio
	file, err := os.Create(path_reportes + "\\cola.dot")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	//write file
	file.WriteString("digraph G {\n")
	file.WriteString("\tlabel = \"Cola pendiente de aprobación estudiantes\";\n\tlabelloc = top;\n")
	file.WriteString("\tbgcolor=gray95;\n")
	file.WriteString("\trankdir=LR;\n")
	file.WriteString("subgraph Cola {\n")
	file.WriteString("\tnode [shape=box,width=2.5,height=1,color=lightblue2, style=filled];\n")
	file.WriteString("\tedge [color=black];\n\n")
	for aux != nil {
		file.WriteString(fmt.Sprintf("\t%d[label=\"%d\\n%s %s\"];\n", aux.Estudiante.carnet, aux.Estudiante.carnet, aux.Estudiante.nombre, aux.Estudiante.apellido))
		aux = aux.Siguiente
	}
	file.WriteString("}\n")
	aux = cola.Inicio
	for aux != nil {
		if aux.Siguiente != nil {
			file.WriteString(fmt.Sprintf("\t%d->%d;\n", aux.Siguiente.Estudiante.carnet, aux.Estudiante.carnet))
		}
		aux = aux.Siguiente
	}
	file.WriteString("}")
	file.Close()

	//generate image
	cmd, err := exec.Command("dot", "-Tsvg", path_reportes+"\\cola.dot", "-o", path_reportes+"\\ColaPendientes.svg").Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(cmd))
}
