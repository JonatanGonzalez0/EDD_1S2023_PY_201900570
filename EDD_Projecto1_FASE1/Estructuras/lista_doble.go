package estructuras

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

type ListaDoble struct {
	Inicio *Nodo
	Fin    *Nodo
}

// constructor
func Nueva_ListaDoble() *ListaDoble {
	lista := new(ListaDoble)
	lista.Inicio = nil
	lista.Fin = nil
	return lista
}

// insertar ordenadamente por carnet menor a mayor en la lista doble
func (lista *ListaDoble) Insertar(estudiante *Estudiante) {

	nuevo := Nuevo_Nodo(estudiante)
	if lista.Inicio == nil {
		lista.Inicio = nuevo
		lista.Fin = nuevo
	} else {
		aux := lista.Inicio
		for aux != nil {
			if aux.Estudiante.carnet > estudiante.carnet {
				if aux == lista.Inicio {
					nuevo.Siguiente = aux
					aux.Anterior = nuevo
					lista.Inicio = nuevo
				} else {
					nuevo.Siguiente = aux
					nuevo.Anterior = aux.Anterior
					aux.Anterior.Siguiente = nuevo
					aux.Anterior = nuevo
				}
				return
			}
			aux = aux.Siguiente
		}
		nuevo.Anterior = lista.Fin
		lista.Fin.Siguiente = nuevo
		lista.Fin = nuevo
	}
}

// mostar lista doble
func (lista *ListaDoble) Imprimir() {
	aux := lista.Inicio

	if aux == nil {
		println("Lista vacia")
		return
	} else {
		println("Lista de estudiantes")
	}

	for aux != nil {
		lengthPassword := len(aux.Estudiante.password)
		asteriscos := ""
		for i := 0; i < lengthPassword; i++ {
			asteriscos += "*"
		}
		fmt.Println("------------------------------------------------------------------------------------------")
		fmt.Printf("Nombre: %s %s, Carnet: %d \n", aux.Estudiante.nombre, aux.Estudiante.apellido, aux.Estudiante.carnet)
		aux = aux.Siguiente
	}
}

// login de usuario
func (lista *ListaDoble) Login(carnet int, password string) bool {
	aux := lista.Inicio
	for aux != nil {
		if aux.Estudiante.carnet == carnet && aux.Estudiante.password == password {
			return true
		}
		aux = aux.Siguiente
	}
	return false
}

// get estudiante by carnet
func (lista *ListaDoble) GetEstudiante(carnet int) *Estudiante {
	aux := lista.Inicio
	for aux != nil {
		if aux.Estudiante.carnet == carnet {
			return aux.Estudiante
		}
		aux = aux.Siguiente
	}
	return nil
}

// comprobar que no exista el carnet
func (lista *ListaDoble) ExisteCarnet(carnet int) bool {
	aux := lista.Inicio
	for aux != nil {
		if aux.Estudiante.carnet == carnet {
			return true
		}
		aux = aux.Siguiente
	}
	return false
}

// crear reporte en graphviz de la lista doble de estudiantes Carnet\n Nombre Apellido
func (lista *ListaDoble) ReporteGraphviz() {
	//get absolute path of the file
	abspath, _ := os.Getwd()
	path_reportes := abspath + "\\Reportes"

	aux := lista.Inicio
	file, err := os.Create(path_reportes + "\\ListaDobleEstudiantes.dot")
	if err != nil {
		println("Error al crear el archivo")
		return
	}
	defer file.Close()
	file.WriteString("digraph G {\n")
	file.WriteString("rankdir=LR;\n")
	file.WriteString("node [shape=record];\n")
	file.WriteString("rankdir=LR;\n")
	file.WriteString("subgraph cluster_0 {\n")
	file.WriteString("style=filled;\n")
	file.WriteString("color=lightgrey;\n")
	file.WriteString("node [style=filled,color=white];\n")
	file.WriteString("label = \"Lista doble de estudiantes\";\n")
	for aux != nil {
		file.WriteString(fmt.Sprintf("node%d [label=\"{<f0> %d|<f1> %s %s}\"];\n", aux.Estudiante.carnet, aux.Estudiante.carnet, aux.Estudiante.nombre, aux.Estudiante.apellido))
		aux = aux.Siguiente
	}
	aux = lista.Inicio
	for aux != nil {
		if aux.Siguiente != nil {
			file.WriteString(fmt.Sprintf("node%d:f0 -> node%d:f0;\n", aux.Estudiante.carnet, aux.Siguiente.Estudiante.carnet))
		}
		if aux.Anterior != nil {
			file.WriteString(fmt.Sprintf("node%d:f0 -> node%d:f0;\n", aux.Estudiante.carnet, aux.Anterior.Estudiante.carnet))
		}
		aux = aux.Siguiente
	}
	file.WriteString("}\n")
	file.WriteString("}")

	//cmd to generate the image
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", path_reportes+"\\ListaDobleEstudiantes.dot").Output()
	mode := 0777
	_ = ioutil.WriteFile(path_reportes+"\\ListaDobleEstudiantes.jpg", cmd, os.FileMode(mode))
}
