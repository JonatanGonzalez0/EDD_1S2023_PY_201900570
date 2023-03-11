document.addEventListener("DOMContentLoaded", function () {
  function cargarArchivo() {
    const inputCargaMasiva = document.getElementById("InputFileCargaMasiva");

    inputCargaMasiva.addEventListener("change", (event) => {
      const archivo = event.target.files[0];
      console.log(archivo);      
    });
  }

  //agregar listener al boton de subir archivo
  document.getElementById("SubirCargaMasiva").addEventListener("click", () => {
    cargarArchivo();
    console.log("subiendo archivo");
  });
});
