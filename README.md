# Manual técnico: Estructuras de datos lineales en Go

## Introducción

Este manual técnico tiene como objetivo presentar la implementación de diversas estructuras de datos lineales utilizando el lenguaje de programación Go. En particular, se han implementado una lista doblemente enlazada, dos pilas y una cola. Además, se utilizará la herramienta Graphviz para graficar estas estructuras de datos.

## Lista doblemente enlazada

La lista doblemente enlazada es una estructura de datos que permite el almacenamiento y acceso de datos de manera secuencial. Para la implementación en Go se utilizo:

`type Nodo struct {
 Estudiante *Estudiante
 Siguiente  *Nodo
 Anterior   *Nodo
}`
