package estructuras

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
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
	//nuevo estudiante a insertar
	nuevo := Nuevo_Nodo(estudiante)
	if lista.Inicio == nil {
		lista.Inicio = nuevo
		lista.Fin = nuevo
	} else {
		//nodo auxiliar para recorrer la lista
		aux := lista.Inicio
		for aux != nil {
			//si el carnet del nuevo estudiante es menor al del auxiliar se inserta antes de auxiliar en la lista
			if aux.Estudiante.carnet > estudiante.carnet {
				//si auxiliar es el inicio de la lista se inserta al inicio
				if aux == lista.Inicio {
					nuevo.Siguiente = aux
					aux.Anterior = nuevo
					lista.Inicio = nuevo
				} else {
					//si auxiliar no es el inicio de la lista se inserta en medio de la lista
					nuevo.Siguiente = aux
					nuevo.Anterior = aux.Anterior
					aux.Anterior.Siguiente = nuevo
					aux.Anterior = nuevo
				}
				return
			}
			//si el carnet del nuevo estudiante es mayor al del auxiliar se inserta despues de auxiliar en la lista
			//se recorre la lista hasta encontrar un nodo con carnet mayor al del nuevo estudiante
			aux = aux.Siguiente
		}
		//si el carnet del nuevo estudiante es mayor a todos los carnet de la lista se inserta al final de la lista
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
	file.WriteString("\tlabel = \"Lista doble de estudiantes\";\n\tlabelloc = top;\n")
	file.WriteString("\tbgcolor=gray95;\n")
	file.WriteString("subgraph Lista {\n")
	file.WriteString("\tnode [shape=box,width=2.5,height=1,color=lightblue2, style=filled];\n")
	file.WriteString("\tedge [color=black];\n\n")
	//nodo null para inicio

	//comentario en dot
	file.WriteString("//Crear Nodos \n\n")
	file.WriteString("\tnull [label = \"Nil\"];\n")

	for aux != nil {
		file.WriteString(fmt.Sprintf("\t%d [label=\"%d\\n %s %s\"];\n", aux.Estudiante.carnet, aux.Estudiante.carnet, aux.Estudiante.nombre, aux.Estudiante.apellido))
		aux = aux.Siguiente
	}
	//nodo null para fin
	file.WriteString("\tnull2 [label = \"Nil\"];\n\n")

	file.WriteString("//Crear Enlaces lista enlazada \n")
	file.WriteString("\tnull->" + fmt.Sprintf("%d", lista.Inicio.Estudiante.carnet) + ";\n")
	file.WriteString(fmt.Sprintf("\t%d->null;\n", lista.Inicio.Estudiante.carnet))

	aux = lista.Inicio
	for aux != nil {
		if aux.Siguiente != nil {
			file.WriteString(fmt.Sprintf("\t%d->%d;\n", aux.Estudiante.carnet, aux.Siguiente.Estudiante.carnet))
			file.WriteString(fmt.Sprintf("\t%d->%d;\n", aux.Siguiente.Estudiante.carnet, aux.Estudiante.carnet))
		}
		aux = aux.Siguiente
	}

	file.WriteString("\tnull2->" + fmt.Sprintf("%d", lista.Fin.Estudiante.carnet) + ";\n")
	file.WriteString(fmt.Sprintf("\t%d->null2;\n\n", lista.Fin.Estudiante.carnet))

	//rank same para todos los estudiantes y null
	file.WriteString("\t{rank=same; null;")
	aux = lista.Inicio
	for aux != nil {
		file.WriteString(fmt.Sprintf("%d;", aux.Estudiante.carnet))
		aux = aux.Siguiente
	}
	file.WriteString("null2}\n\n")
	file.WriteString("}\n")
	file.WriteString("//Crear Pilas bitacora\n")
	//para cada pila de cada estudiante crear un subgrafo con la operacion\n fecha y hora. Pila vertical
	aux = lista.Inicio.Siguiente
	for aux != nil {
		if aux.Estudiante.Bitacora_Estudiante.GetLongitud() != 0 {
			file.WriteString(fmt.Sprintf("subgraph cluster_%d {\n", aux.Estudiante.carnet))
			file.WriteString(fmt.Sprintf("\tlabel = \"Bitacora %d\";\n", aux.Estudiante.carnet))
			file.WriteString("\tlabelloc = bottom;\n")
			file.WriteString("\tcolor = blue;\n")
			file.WriteString("\tbgcolor = gray75;\n")

			file.WriteString("\tnode [color=lightblue2, style=filled, shape=box];\n")
			file.WriteString("\tedge [color=black];\n")
			aux2 := aux.Estudiante.Bitacora_Estudiante.Inicio
			contadorPila := 0
			for aux2 != nil {
				file.WriteString(fmt.Sprintf("\tpila%d_%d [label=\"%s\\n %s %s\"];\n", aux.Estudiante.carnet, contadorPila, aux2.operacion, aux2.fecha, aux2.hora))
				contadorPila++
				aux2 = aux2.Siguiente
			}
			//crear enlaces de la pila desde el ultimo al primero
			for i := 0; i < contadorPila; i++ {
				if i+1 < contadorPila {
					file.WriteString(fmt.Sprintf("\tpila%d_%d->pila%d_%d;\n", aux.Estudiante.carnet, i, aux.Estudiante.carnet, i+1))
				}
			}
			file.WriteString("}\n")

			//INCLUIR A LA MISMA DIRECCION QUE LA LISTA DOBLE si la bitacora no esta vacia
			if aux.Estudiante.Bitacora_Estudiante.GetLongitud() != 0 {
				file.WriteString(fmt.Sprintf("%d->pila%d_%d;\n", aux.Estudiante.carnet, aux.Estudiante.carnet, 0))
			}
		}
		aux = aux.Siguiente
	}

	//bitacora para admin
	admin := lista.Inicio
	file.WriteString(fmt.Sprintf("subgraph cluster_%d {\n", admin.Estudiante.carnet))
	file.WriteString("\tlabel = \"Bitacora Admin\";\n")
	file.WriteString("\tlabelloc = bottom;\n")
	file.WriteString("\tcolor = blue;\n")
	file.WriteString("\tbgcolor = gray75;\n")

	file.WriteString("\tnode [color=lightblue2, style=filled, shape=box];\n")
	file.WriteString("\tedge [color=black];\n")
	aux2 := admin.Estudiante.Bitacora.Inicio
	contadorPila := 0

	for aux2 != nil {
		/* Tipo\n Nombre Apellido\n Fecha Hora */
		Nombre := strings.ReplaceAll(aux2.Estudiante.nombre, " ", "_")
		Apellido := strings.ReplaceAll(aux2.Estudiante.apellido, " ", "_")
		file.WriteString(fmt.Sprintf("\tpila%d_%d [label=\"%s\\n %s %s\\n %s %s\"];\n", admin.Estudiante.carnet, contadorPila, aux2.tipo, Nombre, Apellido, aux2.fecha, aux2.hora))
		contadorPila++
		aux2 = aux2.Siguiente
	}
	//crear enlaces de la pila desde el ultimo al primero
	for i := 0; i < contadorPila; i++ {
		if i+1 < contadorPila {
			file.WriteString(fmt.Sprintf("\tpila%d_%d->pila%d_%d;\n", admin.Estudiante.carnet, i, admin.Estudiante.carnet, i+1))

		}
	}
	if contadorPila != 0 {
		file.WriteString(fmt.Sprintf("%d->pila%d_%d;\n", admin.Estudiante.carnet, admin.Estudiante.carnet, 0))
	}

	file.WriteString("}\n")

	file.WriteString("}")
	file.Close()

	// ejecutar comando para generar la imagen
	cmd, err := exec.Command("dot", "-Tsvg", path_reportes+"\\ListaDobleEstudiantes.dot", "-o", path_reportes+"\\ListaDobleEstudiantes.svg").Output()
	if err != nil {
		println("Error al generar la imagen")
		return
	}
	println(string(cmd))
}

// crear reporte en archivo Json "alumnos": [ {nombre:"nombreEstudiante", carnet: "carnetEstudiante", password:"passEstudiante", CarpetaRaiz:"/"} ]
func (lista *ListaDoble) ReporteJson() {

	//get absolute path of the file
	abspath, _ := os.Getwd()
	path_reportes := abspath + "\\Reportes"

	file, err := os.Create(path_reportes + "\\Estudiantes.json")
	if err != nil {
		println("Error al crear el archivo")
		return
	}
	defer file.Close()
	file.WriteString("{\n")
	file.WriteString("\t\"alumnos\": [\n")
	aux := lista.Inicio.Siguiente
	for aux != nil {
		file.WriteString("\t\t{\n")
		file.WriteString(fmt.Sprintf("\t\t\t\"nombre\": \"%s\",\n", aux.Estudiante.nombre))
		file.WriteString(fmt.Sprintf("\t\t\t\"carnet\": \"%d\",\n", aux.Estudiante.carnet))
		file.WriteString(fmt.Sprintf("\t\t\t\"password\": \"%s\",\n", aux.Estudiante.password))
		file.WriteString("\t\t\t\"CarpetaRaiz\": \"/\"\n")
		if aux.Siguiente != nil {
			file.WriteString("\t\t},\n")
		} else {
			file.WriteString("\t\t}\n")
		}
		aux = aux.Siguiente
	}
	file.WriteString("\t]\n")
	file.WriteString("}")
}
