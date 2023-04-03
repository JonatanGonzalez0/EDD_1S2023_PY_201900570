import AVL from "../Estructuras/arbolAVL.mjs";

//cuando se carga la pagina verificar si en el sessionStorage existe una sesion iniciada
window.onload = function () {
  if (sessionStorage.getItem("sesion") !== null) {
    //si existe una sesion iniciada, redirigir a la pagina de inicio
    if (sessionStorage.getItem("sesion") === "admin") {
      window.location.href = "./dashboardAdmin.html";
    }
    else {
      window.location.href = "./dashboardUser.html";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Escucha el evento de envío del formulario
  document.querySelector("form").addEventListener("submit", function (e) {
    // Evita el comportamiento predeterminado del envío del formulario
    e.preventDefault();
    var usuario = document.querySelector('input[name="usuario"]').value;
    var password = document.querySelector('input[name="password"]').value;

    if (usuario === "admin" && password === "admin") {
      // Si el usuario y la contraseña son correctos, redirige a la página de inicio
      console.log("Inicio de sesión correcto");
      sessionStorage.setItem("sesion", usuario);
      window.location.href = "./dashboardAdmin.html";

    }
    else {
      //obtener el arbol de usuarios del local storage y comprobar si el usuario y contraseña son correctos
      let arbolAVL = new AVL();
      //comprobar que exista el arbol en el local storage
      if (localStorage.getItem("arbolAVL") === null) {
        alert("Error: No existe el arbol en el local storage")
      } else {
        arbolAVL.fromJSON(localStorage.getItem("arbolAVL"));
        //comprobar que el usuario y contraseña sean correctos
        if (arbolAVL.comprobarLogin(usuario, password) ===true ) {
          //sesionsStorage.setItem("sesion", usuario);
          sessionStorage.setItem("sesion", usuario);
          window.location.href = "./dashboardUser.html";
        }else{
          alert("Error de inicio de sesión: Usuario o contraseña incorrectos");
        }
      }      
    }
  });
});