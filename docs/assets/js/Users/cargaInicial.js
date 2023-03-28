
//en la carga de la pagina, comprobar si existe una sesion iniciada
window.onload = function () {
    if (sessionStorage.getItem("sesion") !== null) {
        //si existe una sesion iniciada, redirigir a la pagina de inicio
        if (sessionStorage.getItem("sesion") === "admin") {
            window.location.href = "./dashboardAdmin.html";
        }
    }else{
        //si no existe una sesion iniciada, redirigir a la pagina de login
        window.location.href = "./login.html";
    }
    //txt-Bienvenida es el elemento que muestra el nombre del usuario
    document.getElementById("txt-Bienvenida").innerHTML = "!Bienvenido " + sessionStorage.getItem("sesion") + "!";
}

//txt-busqueda id inputBusqueda detectar el evento enter
inputBusqueda = document.getElementById("inputBusqueda");

inputBusqueda.addEventListener("keyup", function (event) {
    //obtener la ruta buscada en el input inputBusqueda
    let rutaBuscada = document.getElementById("inputBusqueda").value;

    //si se presiona enter
    if (event.keyCode === 13) {
        //por el momento solo mostrar alerta con la ruta buscada
        alert("Ruta buscada: " + rutaBuscada);
    }
});