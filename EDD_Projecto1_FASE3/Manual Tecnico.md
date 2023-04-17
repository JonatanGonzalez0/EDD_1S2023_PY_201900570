# Proyecto 1 - Fase 2 - EDD 2023 MANUAL TÉCNICO

## Introducción

El presente documento tiene como objetivo describir la estructura de datos utilizadas para resolver el proyecto planteado en la fase 2 del curso de Estructuras de Datos.

## Librerias y navegadores utilizados

- [Navegador web (chrome)](https://www.google.com/intl/es-419/chrome/)
- JavaScritp
- HTML & CSS
- Bootstrap

## Estructura de datos

### Estructura de usuarios Arbol AVL

Esta estructura se utiliza para el manejo de usuarios del sistema y su respectiva información es almacenada en el localStorage del navegador en tipo JSON.

`Clase nodoAVL`

    - usuario: esta propiedad se utiliza para almacenar el usuario del nodo.

    - izquierda: esta propiedad se utiliza para almacenar el nodo izquierdo del nodo actual.

    - derecha: esta propiedad se utiliza para almacenar el nodo derecho del nodo actual.

    - altura: esta propiedad se utiliza para almacenar la altura del nodo actual en el árbol.

    - arbolCarpetas: esta propiedad se utiliza para almacenar el árbol n-ario de carpetas del usuario.

    - bitacora : esta propiedad se utiliza para almacenar la bitacora del usuario usando una lista circular simple.

`Clase arbolAVL`

    - raiz: esta propiedad se utiliza para almacenar la raíz del árbol AVL.

`Funciones implementadas`

    - insertar(usuario): esta función se utiliza para insertar un nodo en el árbol AVL.

    - getBalance(nodo): esta función se utiliza para obtener el balance de un nodo.
    
    - altura(nodo): esta función se utiliza para obtener la altura de un nodo.

    - rotacionSimpleDerecha(nodo): esta función se utiliza para realizar una rotación simple a la derecha.

    - rotacionSimpleIzquierda(nodo): esta función se utiliza para realizar una rotación simple a la izquierda.

    - buscarNodo(carnet): esta función se utiliza para buscar un nodo en el árbol AVL por su carnet.

    - preOrden(): esta función se utiliza para recorrer el árbol AVL en preOrden.

    - inOrden(): esta función se utiliza para recorrer el árbol AVL en inOrden.

    - postOrden(): esta función se utiliza para recorrer el árbol AVL en postOrden.

    - comprobarLogin(carnet, password): esta función se utiliza para comprobar si el usuario existe en el árbol AVL y si la contraseña es correcta.

    - toGraphviz(): esta función se utiliza para generar el código de la gráfica del árbol AVL en lenguaje DOT.

### Estructura de carpetas Arbol N-Ario

Esta estructura se utiliza para el manejo de rutas de carpetas de cada usuario.

`Clase nodoArbolNario`

    - siguiente: esta propiedad se utiliza para almacenar el siguiente nodo hermano en la lista de hijos del nodo padre.

    - nombreCarpeta: esta propiedad se utiliza para almacenar el nombre de la carpeta del nodo.

    - primero: esta propiedad se utiliza para almacenar el primer nodo hijo del nodo actual.

    - id: esta propiedad se utiliza para almacenar el ID único del nodo.

    - matriz: esta propiedad se utiliza para almacenar una matriz asociada con el nodo.

`Clase arbolNArio`

    - raiz: esta propiedad se utiliza para almacenar la raíz del árbol n-ario.

    - nodo_creados: esta propiedad se utiliza para llevar un registro del número total de nodos creados en el árbol.

`Funciones implementadas`

    - insertarOrdenado: esta función se utiliza para insertar un nodo en el árbol n-ario de forma ordenada.

    - obtenerNodo: esta función se utiliza para obtener un nodo en el árbol n-ario.

    - eliminarNodos: esta función se utiliza para eliminar un nodo en el árbol n-ario.

    - buscarDirectorio: esta función se utiliza para buscar un directorio en el árbol n-ario.

    - eliminarCarpeta: esta función se utiliza para eliminar una carpeta en el árbol n-ario.

    - grafica_arbol: esta función se utiliza para generar el código de la gráfica del árbol n-ario en lenguaje DOT.

### Estructura de archivos Matriz Dispersa

Esta estructura se utiliza para el manejo de archivos de cada carpeta y asi como sus respectivos permisos de edicion que el usuario pueda tener.

`Clase nodoMatriz`

    - siguiente: esta propiedad se utiliza para almacenar el siguiente nodo en la lista de nodos de la fila actual.

    - anterior: esta propiedad se utiliza para almacenar el nodo anterior en la lista de nodos de la fila actual.

    - arriba: esta propiedad se utiliza para almacenar el nodo superior en la lista de nodos de la columna actual.

    - abajo: esta propiedad se utiliza para almacenar el nodo inferior en la lista de nodos de la columna actual.

    -posX: esta propiedad se utiliza para almacenar la posición en X del nodo en la matriz.

    -posY: esta propiedad se utiliza para almacenar la posición en Y del nodo en la matriz.

    -nombre: esta propiedad se utiliza para almacenar el nombre del archivo que sera identificado como tambien nombre del nodo.

    -contenido: esta propiedad se utiliza para almacenar el contenido del archivo en base64.

`Clase matrizDispersa`

    - principal(-1,-1) : esta propiedad se utiliza para almacenar el nodo principal de la matriz dispersa.

    - coordenadaY: esta propiedad se utiliza para almacenar la coordenada Y de la matriz.

    - coordenadaX: esta propiedad se utiliza para almacenar la coordenada X de la matriz.

`Funciones implementadas`

    - buscarF(nombre_archivo) : esta función se utiliza para buscar un nodo en la matriz dispersa por su nombre dentro de cada fila.

    - buscarC(carnet) : esta función se utiliza para buscar un nodo en la matriz dispersa por el carnet del usuario dentro de cada columna.

    - insertarColumna(coordenadaX,carnet): esta función se utiliza para insertar una columna en la matriz dispersa.

    - insertarFila(coordenadaY,nombre_archivo,contenido): esta función se utiliza para insertar una fila en la matriz dispersa y su respectivo archivo en base64.

    - insertarNodo(x, y, texto): esta función se utiliza para insertar un nodo en la matriz dispersa para dar un permiso de edición a un usuario.

    -reporte(): esta función se utiliza para generar el código de la gráfica de la matriz dispersa en lenguaje DOT.

### Estructura de bitacora Lista Circular Simple

Esta estructura se utiliza para el manejo de bitacora de cada usuario. Cada vez que el usuario cree una carpeta o un archivo se guardara en la bitacora. La bitacora se guarda en el localStorage del navegador en tipo JSON.

`Clase nodoBitacora`

    - accion : esta propiedad se utiliza para almacenar la acción que realizo el usuario. Crear carpeta, crear archivo y eliminar carpeta.

    - nombre : esta propiedad se utiliza para almacenar el nombre de la carpeta o archivo que realizo el usuario.

    - fecha : esta propiedad se utiliza para almacenar la fecha en la que realizo la acción el usuario. Formato: dd/mm/aaaa

    - hora : esta propiedad se utiliza para almacenar la hora en la que realizo la acción el usuario. Formato: hh:mm:ss

    - siguiente : esta propiedad se utiliza para almacenar el siguiente nodo en la lista circular simple.

`Clase listaCircularSimple`

        - cabeza : esta propiedad se utiliza para almacenar el primer nodo de la lista circular simple.
    
        - cola : esta propiedad se utiliza para almacenar el ultimo nodo de la lista circular simple.

`Funciones implementadas`

    -agregar(accion, nombre, fecha, hora) : esta función se utiliza para insertar un nodo en la lista circular simple.

    - recorrer() : esta función se utiliza para recorrer la lista circular simple e imprimir los datos de cada nodo.

    - toJSON() : esta función se utiliza para convertir la lista circular simple en un objeto JSON.

    - fromJSON(json) : esta función se utiliza para convertir un objeto JSON en una lista circular simple.

    - reporte: esta función se utiliza para generar el código de la gráfica de la lista circular simple en lenguaje DOT.
