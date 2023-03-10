// Escucha el evento de envío del formulario
document.querySelector('form').addEventListener('submit', function(e) {
  // Evita el comportamiento predeterminado del envío del formulario
  e.preventDefault();

  // Obtiene los valores de los campos de usuario y contraseña
  var usuario = document.querySelector('input[name="usuario"]').value;
  var password = document.querySelector('input[name="password"]').value;

  // Valida los datos del usuario y contraseña
  if (usuario === 'admin' && password === 'admin') {
    // Si los datos son válidos, redirige al usuario a la página de inicio
    console.log('Inicio de sesión correcto');
    window.location.href = '/dashboardAdmin.html';
  } else {
    // Si los datos no son válidos, muestra un mensaje de error
    alert('Error de inicio de sesión: Usuario o contraseña incorrectos');
  }
});
