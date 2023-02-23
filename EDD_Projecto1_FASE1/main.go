package main

import (
	"EDD_Projecto1_FASE1/estructuras"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strings"
	"time"

	"golang.org/x/text/encoding/charmap"
)

var listaEstudiantes estructuras.ListaDoble
var ColaPendientes estructuras.Cola
var sesion *estructuras.Estudiante

func main() {
	//inicializar
	listaEstudiantes = *estructuras.Nueva_ListaDoble()
	ColaPendientes = *estructuras.Nueva_Cola()

	//crear Estudiante admin "admin", "admin",0,"admin"
	admin := estructuras.Nuevo_Estudiante("admin", "admin", 0, "admin")
	listaEstudiantes.Insertar(admin)

	/* TEST DE FUNCIONES AUTOMATICAS
	//crear usuarios de prueba
	estudiante1 := estructuras.Nuevo_Estudiante("estudiante1", "estudiante1", 201801231, "pass")
	estudiante2 := estructuras.Nuevo_Estudiante("estudiante2", "estudiante2", 201801232, "pass")
	estudiante3 := estructuras.Nuevo_Estudiante("estudiante3", "estudiante3", 201801233, "pass")

	listaEstudiantes.Insertar(estudiante1)
	listaEstudiantes.Insertar(estudiante2)
	listaEstudiantes.Insertar(estudiante3)

	//iterar 3 para simular inicio de sesion de los 3 estudiantes
	for i := 1; i < 4; i++ {
		carnetString := "20180123" + fmt.Sprint(i)
		var carnetInt int
		fmt.Sscan(carnetString, &carnetInt)
		//crear carpeta de usuario
		sesion = listaEstudiantes.GetEstudiante(carnetInt)
		dashboardEstudiante()
	}

	cargaMasiva("D:\\carga.csv")
	dashboardAdmin()*/
	menu()
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
			//salir
			opcion = 2
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
		sesion = listaEstudiantes.GetEstudiante(0)
		dashboardAdmin()
	} else {
		//convertir usuario a int
		var usuarioInt int
		fmt.Sscan(usuario, &usuarioInt)

		//comprobar login
		var comprobarLogin bool = listaEstudiantes.Login(usuarioInt, password)
		if comprobarLogin {
			sesion = listaEstudiantes.GetEstudiante(usuarioInt)

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
	for opcion != 6 {
		println("1. Ver estudiantes pendientes")
		println("2. Ver estudiantes del sistema")
		println("3. Registrar nuevo estudiante")
		println("4. Carga masiva de estudiantes")
		println("5. Reportes")
		println("6. Cerar sesion")
		println("------------------------------------------------------------------------------------------")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			println("------------------------------------------------------------------------------------------")

			//por cada estudiante en la cola mostrar su informacion y opcion de aprobar o rechazar
			opcion := 0
			for !ColaPendientes.EstaVacia() && opcion != 3 {
				fmt.Printf("\n------------------------ Estudiantes pendientes de aprobacion : %d ------------------------\n", ColaPendientes.GetLongitud())
				estudiante := ColaPendientes.ObtenerInicio()
				println("Nombre: ", estudiante.GetNombre(), estudiante.GetApellido())
				println("Carnet: ", estudiante.GetCarnet())
				println("------------------------------------------------------------------------------------------")
				println("1. Aprobar")
				println("2. Rechazar")
				println("3. Salir")
				fmt.Scan(&opcion)

				switch opcion {
				case 1:
					estudiante := ColaPendientes.Desencolar()
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
					estudiante := ColaPendientes.Desencolar()
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

			//si existe el carnet no se puede crear el estudiante
			if listaEstudiantes.ExisteCarnet(carnet) || ColaPendientes.ExisteCarnet(carnet) {
				println("------------------------------------------------------------------------------------------")
				println("!! El carnet ", carnet, " ya existe en el sistema !!")
				println("------------------------------------------------------------------------------------------")
				break
			}
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
			//cargaMasiva(ruta)
			cargaMasivaV2(ruta)
			println("------------------------------------------------------------------------------------------")
		case 5:
			println("------------------------------------------------------------------------------------------")
			Reportes()
		case 6:
			println("Saliendo del dashboard de administrador")
			menu()

		}

	}
}

func dashboardEstudiante() {
	//agregar log a bitacoraEstudiante
	operacion := "Inicio de sesion"
	//obtejer la fecha en string
	fecha := time.Now()
	fechaString := fecha.Format("2006-01-02")
	hora := fecha.Format("15:04:05")

	//obtener el estudiante de la sesion actual en memoria
	sesion.Bitacora_Estudiante.Apilar(operacion, fechaString, hora)

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
	//agregar log a bitacoraEstudiante
	operacion = "Cierre de sesion"
	//obtejer la fecha en string
	fecha = time.Now()
	fechaString = fecha.Format("2006-01-02")
	hora = fecha.Format("15:04:05")
	//crear log
	sesion.Bitacora_Estudiante.Apilar(operacion, fechaString, hora)
	menu()
}

func Reportes() {
	opcion := 0
	for opcion != 4 {
		println("------------------------------------------------------------------------------------------")
		println("1. Reporte Lista de estudiantes")
		println("2. Reporte cola de estudiantes pendientes")
		println("3. Reporte Json")
		println("4. Salir")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			println("------------------------------------------------------------------------------------------")
			listaEstudiantes.ReporteGraphviz()
			println("------------------------------------------------------------------------------------------")

		case 2:
			println("------------------------------------------------------------------------------------------")
			ColaPendientes.ReporteGraphviz()
			println("------------------------------------------------------------------------------------------")
		case 3:
			println("------------------------------------------------------------------------------------------")
			listaEstudiantes.ReporteJson()
			println("------------------------------------------------------------------------------------------")
		case 4:
			println("Saliendo del menu de reportes")
			dashboardAdmin()
		}
	}
}

func cargaMasivaV2(ruta string) {
	archivo, err := os.Open(ruta)
	if err != nil {
		println("Error al abrir el archivo")
		return
	}
	defer archivo.Close()

	decoder := charmap.ISO8859_1.NewDecoder()
	lector := csv.NewReader(decoder.Reader(archivo))

	contador := 0

	for {
		linea, err := lector.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			println("Error al leer el archivo")
			return
		}
		if linea[0] == "carnet" {
			continue
		}
		contador++
		//convertir carnet a int
		var carnet int
		fmt.Sscan(linea[0], &carnet)

		//comprobar si el carnet ya existe
		if listaEstudiantes.ExisteCarnet(carnet) || ColaPendientes.ExisteCarnet(carnet) {
			println("------------------------------------------------------------------------------------------")
			println("!! El carnet", carnet, "ya existe en el sistema !!")
			println("------------------------------------------------------------------------------------------")
			continue
		}
		//crear estudiante
		nombre := strings.Split(linea[1], " ")[0]
		apellido := strings.Split(linea[1], " ")[1]

		estudiante := estructuras.Nuevo_Estudiante(nombre, apellido, carnet, linea[2])
		//insertar estudiante en la lista doble
		ColaPendientes.Encolar(estudiante)
	}
	println("------------------------------------------------------------------------------------------")
	println("!! ", contador, "estudiantes agregados a la cola [pendientes de aprobación] !!")
}
