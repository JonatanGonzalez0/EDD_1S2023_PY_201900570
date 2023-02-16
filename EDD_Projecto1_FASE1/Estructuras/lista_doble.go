package estructuras

import "fmt"

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
		fmt.Printf("Nombre: %s %s, Carnet: %d, Password: %s\n", aux.Estudiante.nombre, aux.Estudiante.apellido, aux.Estudiante.carnet, asteriscos)
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
