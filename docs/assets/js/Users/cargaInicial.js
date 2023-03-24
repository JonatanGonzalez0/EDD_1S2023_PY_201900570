
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

icono_busqueda = document.getElementById("icono-busqueda");
icono_busqueda.addEventListener("click", function () {
    //obtener la ruta buscada en el input inputBusqueda
    let rutaBuscada = document.getElementById("inputBusqueda").value;
    
    //por el momento solo mostrar alerta con la ruta buscada
    alert("Ruta buscada: " + rutaBuscada);
});

// nueva carpeta 
btn_nueva_carpeta = document.getElementById("nuevaCarpeta");
btn_nueva_carpeta.addEventListener("click", function () {
    //por el momento solo mostrar alerta
    alert("Crear nueva carpeta");
}); 

//eliminar carpeta
btn_eliminar_carpeta = document.getElementById("eliminarCarpeta");
btn_eliminar_carpeta.addEventListener("click", function () {
    //por el momento solo mostrar alerta
    alert("Eliminar carpeta");
});