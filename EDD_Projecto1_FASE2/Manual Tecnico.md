# Proyecto 1 - Fase 2 - EDD 2023 MANUAL TÉCNICO

## Introducción

El presente documento tiene como objetivo describir la estructura de datos utilizadas para resolver el proyecto planteado en la fase 2 del curso de Estructuras de Datos.

## Librerias y navegadores utilizados

- [Navegador web (chrome)](https://www.google.com/intl/es-419/chrome/)
- JavaScritp
- HTML & CSS
- Bootstrap

## Estructura de archivos

### Estructura de carpetas Arbol N-Ario
Esta estructura se utiliza para el manejo de rutas de carpetas de cada usuario.

`Clase nodoArbolNario`

    `siguiente`: esta propiedad se utiliza para almacenar el siguiente nodo hermano en la lista de hijos del nodo padre.
    `nombreCarpeta`: esta propiedad se utiliza para almacenar el nombre de la carpeta del nodo.
    `primero`: esta propiedad se utiliza para almacenar el primer nodo hijo del nodo actual.
    `id`: esta propiedad se utiliza para almacenar el ID único del nodo.
    `matriz`: esta propiedad se utiliza para almacenar una matriz asociada con el nodo.

`Clase arbolNArio`

    `raiz`: esta propiedad se utiliza para almacenar la raíz del árbol n-ario.
    `nodo_creados`: esta propiedad se utiliza para llevar un registro del número total de nodos creados en el árbol.

