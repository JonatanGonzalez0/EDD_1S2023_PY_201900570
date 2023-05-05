# Proyecto 1 - Fase 2 - EDD 2023 MANUAL TÉCNICO

## Introducción

El presente documento tiene como objetivo describir la estructura de datos utilizadas para resolver el proyecto planteado en la fase 3 del curso de Estructuras de Datos.

## Librerias y navegadores utilizados

- [Navegador web (chrome)](https://www.google.com/intl/es-419/chrome/)
- JavaScritp
- HTML & CSS
- Bootstrap

## Estructura de datos

### Estructura de carpetas Grafo Dirigido

Esta estructura se utiliza para el manejo de carpetas de los usuarios del sistema y su respectiva información es almacenada en el localStorage del navegador en tipo JSON.

`Clase nodoMatrizAdyacencia`

    - siguiente : esta propiedad se utiliza para almacenar el nodo siguiente del nodo actual.

    - abajo : esta propiedad se utiliza para almacenar el nodo abajo del nodo actual.

    - valor : esta propiedad se utiliza para almacenar el valor del nodo actual.

`Clase grafoDirigido`

    - principal : esta propiedad se utiliza para almacenar el nodo principal del grafo.

`Funciones implementadas`

    - convertirAGrafo(arbolCarpetas)  : esta función se utiliza para convertir el árbol n-ario de carpetas del usuario en un grafo dirigido.

    - validarRuta(ruta) : esta función se utiliza para validar si la ruta ingresada por el usuario es correcta.
    
    - retornarHijos(ruta) : esta función se utiliza para retornar las carpetas que estan dentro de la ruta ingresada por el usuario.

    - rotacionSimpleDerecha(nodo): esta función se utiliza para realizar una rotación simple a la derecha.

    - insertarValores(padre, hijos) : esta función se utiliza para insertar los valores hijos de un nodo padre dentro del grafo dirigido.
    
    - grafica() : esta función se utiliza para generar el código de la gráfica del grafo dirigido en lenguaje DOT.

### Estructura Usuarios Tabla Hash

`Clase nodoHash`

    - carnet : esta propiedad se utiliza para almacenar el carnet del usuario.

    - nombre : esta propiedad se utiliza para almacenar el nombre del usuario.

    - apellido : esta propiedad se utiliza para almacenar el apellido del usuario.

    - password : esta propiedad se utiliza para almacenar la contraseña del usuario.

    - grafo : esta propiedad se utiliza para almacenar el grafo de carpetas del usuario.

`Clase tablaHash`

        - tabla : esta propiedad se utiliza para almacenar la tabla hash.

        - capacidad : esta propiedad se utiliza para almacenar la capacidad de la tabla hash.

        - utilizacion : esta propiedad se utiliza para almacenar la utilización de la tabla hash.

`Funciones implementadas`

    - insertar(carnet, nombre, apellido, password) : esta función se utiliza para insertar un usuario en la tabla hash.

    - busquedaUsuario(carnet): esta función se utiliza para buscar un usuario en la tabla hash.

    - comprobarLogin(carnet, password): esta función se utiliza para comprobar si el usuario existe en la tabla hash y si la contraseña es correcta.

    -async fromLocalAVL() : esta función se utiliza para obtener los usuarios del localStorage y convertirlos en la tabla hash.

    - grafica() : esta función se utiliza para generar el código de la gráfica de la tabla hash en lenguaje DOT.

### Encriptacion AES

Para la encriptacion de mensajes se utilizo el algoritmo AES, el cual es un algoritmo de cifrado por bloques, es decir, que divide el mensaje en bloques para su cifrado. Para la implementacion de este algoritmo se utilizo la libreria CryptoJS.

`Implementacion`
    Para implementar la encriptacion se utilizo una clave unica un iv unico y un algoritmo de encriptacion AES, el cual se utilizo para encriptar y desencriptar los mensajes.

    `Funciones implementadas`

        - encriptacion(mensaje) : esta función se utiliza para encriptar un mensaje y devuelve el mensaje encriptado en base64.

        - desencriptacion(mensaje) : esta función se utiliza para desencriptar un mensaje y devuelve el mensaje desencriptado en texto original.

        - sha256(mensaje) : esta función se utiliza para obtener el hash sha256 de cada bloque de mensaje y tambien para encriptacion y comparacion de contraseñas de los usuarios.
