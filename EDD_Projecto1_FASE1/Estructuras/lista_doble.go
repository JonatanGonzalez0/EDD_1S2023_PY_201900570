package estructuras

import (
	"fmt"
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
	//escribir en el archivo dot Carnet\n Nombre Apellido
	file.WriteString("digraph G {\n")
	file.WriteString("rankdir=LR;\n")
	file.WriteString("node [shape=record];\n")
	file.WriteString("node [color=lightblue2, style=filled];\n")
	file.WriteString("edge [color=black];\nlabel = \"Lista doble de estudiantes\";\n")

	for aux != nil {
		file.WriteString(fmt.Sprintf("%d[label=\"%d\\n %s %s\"];\n", aux.Estudiante.carnet, aux.Estudiante.carnet, aux.Estudiante.nombre, aux.Estudiante.apellido))
		aux = aux.Siguiente
	}
	aux = lista.Inicio
	for aux != nil {
		if aux.Siguiente != nil {
			file.WriteString(fmt.Sprintf("%d->%d;\n", aux.Estudiante.carnet, aux.Siguiente.Estudiante.carnet))
		}
		if aux.Anterior != nil {
			file.WriteString(fmt.Sprintf("%d->%d;\n", aux.Estudiante.carnet, aux.Anterior.Estudiante.carnet))
		}
		aux = aux.Siguiente
	}
	file.WriteString("}")

	// ejecutar comando para generar la imagen
	cmd, err := exec.Command("dot", "-Tpng", path_reportes+"\\ListaDobleEstudiantes.dot", "-o", path_reportes+"\\ListaDobleEstudiantes.png").Output()
	if err != nil {
		println("Error al generar la imagen")
		return
	}
	println(string(cmd))

}
