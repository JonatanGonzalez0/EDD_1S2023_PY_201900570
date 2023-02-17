package main

import (
	"EDD_Projecto1_FASE1/estructuras"
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
)

var listaEstudiantes estructuras.ListaDoble
var ColaPendientes estructuras.Cola

func main() {
	//inicializar
	listaEstudiantes = *estructuras.Nueva_ListaDoble()
	ColaPendientes = *estructuras.Nueva_Cola()

	//crear Estudiante admin "admin", "admin",0,"admin"
	admin := estructuras.Nuevo_Estudiante("admin", "admin", 0, "admin")
	listaEstudiantes.Insertar(admin)

	cargaMasiva("D:\\carga.csv")
	dashboardAdmin()
	//menu()
}
func menu() {
	println("EDD GoDrive")
	println("Bienvenido al sistema de archivos GoDrive")

	opcion := 0
	for opcion != 2 {
		println("1. Iniciar sesion")
		println("2. Salir")
		println("------------------------------------------------------------------------------------------")
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
	println("------------------------------------------------------------------------------------------")
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
	println("------------------------------------------------------------------------------------------")
	println("Bienvenido al dashboard de administrador de GoDrive")
	opcion := 0
	for opcion != 5 {
		println("1. Ver estudiantes pendientes")
		println("2. Ver estudiantes del sistema")
		println("3. Registrar nuevo estudiante")
		println("4. Carga masiva de estudiantes")
		println("5. Cerar sesion")
		println("------------------------------------------------------------------------------------------")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			println("------------------------------------------------------------------------------------------")

			//por cada estudiante en la cola mostrar su informacion y opcion de aprobar o rechazar
			opcion := 0
			for !ColaPendientes.EstaVacia() && opcion != 3 {
				fmt.Printf("\n------------------------ Estudiantes pendientes de aprobacion : %d ------------------------\n", ColaPendientes.GetLongitud())
				estudiante := ColaPendientes.Desencolar()
				println("Nombre: ", estudiante.GetNombre(), estudiante.GetApellido())
				println("Carnet: ", estudiante.GetCarnet())
				println("------------------------------------------------------------------------------------------")
				println("1. Aprobar")
				println("2. Rechazar")
				println("3. Salir")
				fmt.Scan(&opcion)

				switch opcion {
				case 1:
					//insertar estudiante en la lista doble
					listaEstudiantes.Insertar(estudiante)
					admin := listaEstudiantes.GetEstudiante(0)
					operacion := "Se aprobo al estudiante "
					//obtejer la fecha en string
					fecha := time.Now()
					fechaString := fecha.Format("2006-01-02")
					hora := fecha.Format("15:04:05")

					//crear log
					admin.Bitacora.Apilar(operacion, estudiante, fechaString, hora)

					println("Estudiante aprobado con exito")
				case 2:
					admin := listaEstudiantes.GetEstudiante(0)
					operacion := "Se rechazo al estudiante"
					//obtejer la fecha en string
					fecha := time.Now()
					fechaString := fecha.Format("2006-01-02")
					hora := fecha.Format("15:04:05")

					//crear log
					admin.Bitacora.Apilar(operacion, estudiante, fechaString, hora)
					println("Estudiante rechazado con exito")
				case 3:
					//regresar a menu principal
					println("Saliendo del menu de estudiantes pendientes")
					opcion = 3
				default:
					println("Opcion no valida")
				}
			}
			fmt.Println("------------------- Estudiantes pendientes de aprobacion : 0 -----------------------------")

		case 2:
			println("------------------------------------------------------------------------------------------")
			listaEstudiantes.Imprimir()
			println("------------------------------------------------------------------------------------------")
		case 3:
			println("------------------------------------------------------------------------------------------")
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
			ColaPendientes.Encolar(estudiante)
			println("------------------------------------------------------------------------------------------")
			println("!! Estudiante agregado a la cola de pendientes de aprobación !!")
			println("------------------------------------------------------------------------------------------")
		case 4:
			fmt.Println("------------------------------------------------------------------------------------------")
			fmt.Println("Ingrese la ruta del archivo csv")
			var ruta string
			fmt.Scan(&ruta)
			println("ruta: ", ruta)
			cargaMasiva(ruta)
			println("------------------------------------------------------------------------------------------")
		case 5:
			println("Saliendo del dashboard de administrador")
			menu()
		default:
		}

	}
}

func dashboardEstudiante() {
	println("------------------------------------------------------------------------------------------")
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

// carga masiva de estudiantes desde un archivo csv con el siguiente formato carnet, nombre apellido ,contraseña
func cargaMasiva(ruta string) {
	//abrir archivo
	archivo, err := os.Open(ruta)
	if err != nil {
		println("Error al abrir el archivo")
		return
	}
	defer archivo.Close()

	//crear un scanner para leer el archivo
	scanner := bufio.NewScanner(archivo)

	//leer el archivo linea por linea
	for scanner.Scan() {
		linea := scanner.Text()
		//separar la linea por comas
		lineaSeparada := strings.Split(linea, ",")
		//convertir carnet a int
		var carnet int
		fmt.Sscan(lineaSeparada[0], &carnet)
		//crear estudiante
		nombre := strings.Split(lineaSeparada[1], " ")[0]
		apellido := strings.Split(lineaSeparada[1], " ")[1]

		estudiante := estructuras.Nuevo_Estudiante(nombre, apellido, carnet, lineaSeparada[2])
		//insertar estudiante en la lista doble
		ColaPendientes.Encolar(estudiante)
	}
	println("------------------------------------------------------------------------------------------")
	println("!! Estudiantes cargados a la cola de pendientes de aprobación !!")
}
