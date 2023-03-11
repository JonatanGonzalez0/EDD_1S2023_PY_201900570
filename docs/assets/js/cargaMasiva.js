const inputCargaMasiva = document.getElementById("InputFileCargaMasiva");

inputCargaMasiva.addEventListener("change", (event) => {
  const archivo = event.target.files[0];
  console.log(archivo);
  //esperar a que se presione el boton de enviar id SubirCargaMasiva
  const botonSubir = document.getElementById("SubirCargaMasiva");
  botonSubir.addEventListener("click", () => {
    console.log("subiendo archivo");
   
  });
});