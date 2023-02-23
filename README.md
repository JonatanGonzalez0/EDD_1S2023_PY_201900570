# Proyecto 1 - Fase 1 - EDD 2023

## Requirements

- [Go](https://golang.org/dl/)
- [Graphviz](https://graphviz.org/download/)

## Ejecutando el proyecto

- Clonar el repositorio
- Dentro de la carpeta EDD_Projecto1_FASE1 entonctraras el archivo 'run.exe' el cual ejecutara el proyecto en la terminal de windows.

## Manual técnico: Estructuras de datos lineales en Go

### Introducción

Este manual técnico tiene como objetivo presentar la implementación de diversas estructuras de datos lineales utilizando el lenguaje de programación Go. En particular, se han implementado una lista doblemente enlazada, dos pilas y una cola. Además, se utilizará la herramienta Graphviz para graficar estas estructuras de datos.

### Lista doblemente enlazada

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
3. Si la lista no está vacía, se verifica si el carnet del estudiante a registrar es menor al del primer nodo de la lista,en caso de serlo, se inserta el nuevo nodo al inicio de la lista.
4. Si el carnet del estudiante a registrar es mayor al del último nodo de la lista, se inserta el nuevo nodo al final dela lista.
5. Si el carnet del estudiante a registrar se encuentra entre el primer y último nodo de la lista, se recorre la lista hasta encontrar el nodo que cumpla con la condición de que el carnet del estudiante a registrar sea mayor al del nodo anterior ymenor al del nodo siguiente, en ese momento se inserta el nuevo nodo en la posición correspondiente.

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

### Pilas

Las pilas son estructuras de datos que permiten el almacenamiento y acceso de datos de manera LIFO (Last In First Out). Para la implementación en Go se utilizo:

```go
type NodoPilaEstudiante struct {
    operacion string
    fecha     string
    hora      string

    Siguiente *NodoPilaEstudiante
    Anterior  *NodoPilaEstudiante
}
```

Para unificar y tener acceso a los nodos se utilizo una estructura Pila:

```go
type PilaEstudiante struct {
    Inicio   *NodoPilaEstudiante
    Fin      *NodoPilaEstudiante
    Longitud int
}
```

Se implementan los metodos Apilar, Desapilar.

```go
// funcion apilar
func (pila *PilaEstudiante) Apilar(operacion string, fecha string, hora string) {
    nuevo := Nuevo_NodoPilaEstudiante(operacion, fecha, hora)
    if pila.Inicio == nil {
        pila.Inicio = nuevo
        pila.Fin = nuevo
        pila.Longitud++
    } else {
        nuevo.Siguiente = pila.Inicio
        pila.Inicio.Anterior = nuevo
        pila.Inicio = nuevo
        pila.Longitud++
    }
}
```

```go
// funcion desapilar
func (pila *PilaEstudiante) Desapilar() *NodoPilaEstudiante {
    if pila.Inicio == nil {
        pila.Longitud = 0
        return nil
    } else {
        nodo := pila.Inicio
        pila.Inicio = pila.Inicio.Siguiente
        pila.Longitud--
        return nodo
    }
}
```

### Cola

Las colas son estructuras de datos que permiten el almacenamiento y acceso de datos de manera FIFO (First In First Out). Para la implementación en Go se utilizo:

```go
type NodoCola struct {
    Estudiante *Estudiante
    Siguiente  *NodoCola
}
```

Para unificar y tener acceso a los nodos se utilizo una estructura Cola:

```go
type Cola struct {
    Inicio   *NodoCola
    Fin      *NodoCola
    Longitud int
}
```

Se implementan los metodos Encolar, Desencolar.

```go
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
```

```go
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
```

### Graphviz

Graphviz es una herramienta de código abierto que permite la creación de gráficos de estructuras de datos.

Acontinuación se muestra los reportes generados por Graphviz:

#### Reporte de Estudiantes

![Lista Doble + Pilas](https://i.imgur.com/Xy2bvgq.png)

#### Reporte de Cola de estudiantes pendientes

![Cola](https://i.imgur.com/8PZ8IFJ.png)

#### Reporte de Estudiantes JSON

Para la creación del reporte de estudiantes en formato JSON se utilizo la libreria [encoding/json](https://golang.org/pkg/encoding/json/).

```json
{
    "alumnos": [
        {
            "nombre": "Ebany",
            "carnet": "201403877",
            "password": "qwerty12",
            "CarpetaRaiz": "/"
        },
        {
            "nombre": "Cristian",
            "carnet": "201700918",
            "password": "Cris123",
            "CarpetaRaiz": "/"
        },
        {
            "nombre": "Leonardo",
            "carnet": "201780044",
            "password": "leo123",
            "CarpetaRaiz": "/"
        },
        {
            "nombre": "Lourdes",
            "carnet": "201902259",
            "password": "Lourdes123",
            "CarpetaRaiz": "/"
        },
        {
            "nombre": "Alejandro",
            "carnet": "201903549",
            "password": "Alejandro124",
            "CarpetaRaiz": "/"
        }
    ]
}
```
