# Manual técnico: Estructuras de datos lineales en Go

## Introducción

Este manual técnico tiene como objetivo presentar la implementación de diversas estructuras de datos lineales utilizando el lenguaje de programación Go. En particular, se han implementado una lista doblemente enlazada, dos pilas y una cola. Además, se utilizará la herramienta Graphviz para graficar estas estructuras de datos.

## Lista doblemente enlazada

La lista doblemente enlazada es una estructura de datos que permite el almacenamiento y acceso de datos de manera secuencial. Para la implementación en Go se utilizo:

```go
type Nodo struct {
    Estudiante *Estudiante
    Siguiente *Nodo
    Anterior *Nodo
}
```

Para unificar y tener acceso a los nodos se utilizo una estructura Lista Doble:

```go
type ListaDoble struct {
    Inicio *Nodo
    Fin    *Nodo
}
```

Para el metodo de inserción a la lista se utiliza ordenamiento en base al carnet del estudiante a registrar, el proceso sigue la siguiente metodología:

    1. Se crea un nuevo nodo con el estudiante a registrar.
    2. Se verifica si la lista está vacía, en caso de estarlo, se asigna el nuevo nodo como inicio y fin de la lista.
    3. Si la lista no está vacía, se verifica si el carnet del estudiante a registrar es menor al del primer nodo de la lista, en caso de serlo, se inserta el nuevo nodo al inicio de la lista.
    4. Si el carnet del estudiante a registrar es mayor al del último nodo de la lista, se inserta el nuevo nodo al final de la lista.
    5. Si el carnet del estudiante a registrar se encuentra entre el primer y último nodo de la lista, se recorre la lista hasta encontrar el nodo que cumpla con la condición de que el carnet del estudiante a registrar sea mayor al del nodo anterior y menor al del nodo siguiente, en ese momento se inserta el nuevo nodo en la posición correspondiente.

```go
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
					//si auxiliar no es el inicio de la lista se inserta en medio de la lista , actualizando los enlaces de los nodos adyacentes a auxiliar y nuevo
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
```
