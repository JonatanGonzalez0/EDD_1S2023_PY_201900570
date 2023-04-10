# Proyecto 1 - Fase 2 - EDD 2023 MANUAL TÉCNICO

## Introducción

El presente documento tiene como objetivo describir la estructura de datos utilizadas para resolver el proyecto planteado en la fase 2 del curso de Estructuras de Datos.

## Librerias y navegadores utilizados

- [Navegador web (chrome)](https://www.google.com/intl/es-419/chrome/)
- JavaScritp
- HTML & CSS
- Bootstrap

## Estructura de archivos

### Estructura de carpetas Arbol AVL

Esta estructura se utiliza para el manejo de usuarios del sistema y su respectiva información es almacenada en el localStorage del navegador en tipo JSON.

`Clase nodoAVL`

    -usuario: esta propiedad se utiliza para almacenar el usuario del nodo.
    -izquierda: esta propiedad se utiliza para almacenar el nodo izquierdo del nodo actual.
    -derecha: esta propiedad se utiliza para almacenar el nodo derecho del nodo actual.
    -altura: esta propiedad se utiliza para almacenar la altura del nodo actual en el árbol.
    -arbolCarpetas: esta propiedad se utiliza para almacenar el árbol n-ario de carpetas del usuario.
    -bitacora : esta propiedad se utiliza para almacenar la bitacora del usuario usando una lista circular simple.

`Clase arbolAVL`

    -raiz: esta propiedad se utiliza para almacenar la raíz del árbol AVL.

`Funciones implementadas`
    -insertar(usuario): esta función se utiliza para insertar un nodo en el árbol AVL.
    -getBalance(nodo): esta función se utiliza para obtener el balance de un nodo.
    -altura(nodo): esta función se utiliza para obtener la altura de un nodo.
    -rotacionSimpleDerecha(nodo): esta función se utiliza para realizar una rotación simple a la derecha.
    -rotacionSimpleIzquierda(nodo): esta función se utiliza para realizar una rotación simple a la izquierda.
    -buscarNodo(carnet): esta función se utiliza para buscar un nodo en el árbol AVL por su carnet.
    -preOrden(): esta función se utiliza para recorrer el árbol AVL en preOrden.
    -inOrden(): esta función se utiliza para recorrer el árbol AVL en inOrden.
    -postOrden(): esta función se utiliza para recorrer el árbol AVL en postOrden.
    -comprobarLogin(carnet, password): esta función se utiliza para comprobar si el usuario existe en el árbol AVL y si la contraseña es correcta.
    -toGraphviz(): esta función se utiliza para generar el código de la gráfica del árbol AVL en lenguaje DOT.

### Estructura de carpetas Arbol N-Ario

Esta estructura se utiliza para el manejo de rutas de carpetas de cada usuario.

`Clase nodoArbolNario`

    -siguiente: esta propiedad se utiliza para almacenar el siguiente nodo hermano en la lista de hijos del nodo padre.
    -nombreCarpeta: esta propiedad se utiliza para almacenar el nombre de la carpeta del nodo.
    -primero: esta propiedad se utiliza para almacenar el primer nodo hijo del nodo actual.
    -id: esta propiedad se utiliza para almacenar el ID único del nodo.
    -matriz: esta propiedad se utiliza para almacenar una matriz asociada con el nodo.

`Clase arbolNArio`

    -raiz: esta propiedad se utiliza para almacenar la raíz del árbol n-ario.
    -nodo_creados: esta propiedad se utiliza para llevar un registro del número total de nodos creados en el árbol.

`Funciones implementadas`

    -insertarOrdenado: esta función se utiliza para insertar un nodo en el árbol n-ario de forma ordenada.
    -obtenerNodo: esta función se utiliza para obtener un nodo en el árbol n-ario.
    -eliminarNodos: esta función se utiliza para eliminar un nodo en el árbol n-ario.
    -buscarDirectorio: esta función se utiliza para buscar un directorio en el árbol n-ario.
    -eliminarCarpeta: esta función se utiliza para eliminar una carpeta en el árbol n-ario.
    -grafica_arbol: esta función se utiliza para generar el código de la gráfica del árbol n-ario en lenguaje DOT.

