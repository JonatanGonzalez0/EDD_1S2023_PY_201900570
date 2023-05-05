//comprobar si existe una sesion iniciada en el sessionStorage
//si no existe una sesion iniciada, redirigir a la pagina de login

if (sessionStorage.getItem("sesion") === null) {
  window.location.href = "./login.html";
}
