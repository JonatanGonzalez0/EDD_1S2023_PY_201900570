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
      window.location.href = "./dashboardAdmin.html";
    } else {
      alert("Error de inicio de sesión: Usuario o contraseña incorrectos");
    }
  });
});
