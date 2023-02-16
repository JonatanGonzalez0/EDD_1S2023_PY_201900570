package main

import (
	"EDD_Projecto1_FASE1/estructuras"
	"fmt"
)

var listaEstudiantes estructuras.ListaDoble

func main() {
	//crear lista doble
	listaEstudiantes = *estructuras.Nueva_ListaDoble()

	menu()
}
func menu() {
	println("EDD GoDrive")
	println("Bienvenido al sistema de archivos GoDrive")

	opcion := 0
	for opcion != 2 {
		println("1. Iniciar sesion")
		println("2. Salir")
		println("Ingrese una opcion")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			login()
		case 2:
			println("Gracias por usar GoDrive")
		default:
			println("Opcion no valida")

		}
	}
}

func login() {
	println("Ingrese su usuario")
	var usuario string
	fmt.Scan(&usuario)
	println("Ingrese su contraseña")
	var password string
	fmt.Scan(&password)

	if usuario == "admin" && password == "admin" {
		dashboardAdmin()
	} else {
		//convertir usuario a int
		var usuarioInt int
		fmt.Sscan(usuario, &usuarioInt)

		//comprobar login
		var comprobarLogin bool = listaEstudiantes.Login(usuarioInt, password)
		if comprobarLogin {
			dashboardEstudiante()
		} else {
			println("Usuario o contraseña incorrectos Intente de nuevo")
			login()
		}
	}
}

func dashboardAdmin() {
	println("Bienvenido al dashboard de administrador de GoDrive")
	opcion := 0
	for opcion != 5 {
		println("1. Ver estudiantes pendientes")
		println("2. Ver estudiantes del sistema")
		println("3. Registrar nuevo estudiante")
		println("4. Carga masiva de estudiantes")
		println("5. Cerar sesion")
		fmt.Scan(&opcion)

		switch opcion {
		case 2:
			listaEstudiantes.Imprimir()
		case 3:
			println("REGISTRO nuevo estudiante en GoDrive")
			println("Ingrese el nombre del estudiante")
			var nombre string
			fmt.Scan(&nombre)
			println("Ingrese el apellido del estudiante")
			var apellido string
			fmt.Scan(&apellido)
			println("Ingrese el carnet del estudiante")
			var carnet int
			fmt.Scan(&carnet)
			println("Ingrese la contraseña del estudiante")
			var password string
			fmt.Scan(&password)

			//crear estudiante
			estudiante := estructuras.Nuevo_Estudiante(nombre, apellido, carnet, password)
			//insertar estudiante en la lista doble
			//todo: comprobar que no exista el carnet y cola de pendientes de aprobacion

			listaEstudiantes.Insertar(estudiante)
			println("Estudiante registrado con exito")
		}

	}
}

func dashboardEstudiante() {
	println("Bienvenido al dashboard de estudiante de GoDrive")
	opcion := 0
	for opcion != 5 {
		println("1. Ver archivos")
		println("2. Subir archivos")
		println("3. Descargar archivos")
		println("4. Eliminar archivos")
		println("5. Cerrar sesion")

		fmt.Scan(&opcion)

	}
}
