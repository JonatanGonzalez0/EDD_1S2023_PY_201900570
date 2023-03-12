class Usuario {
  constructor(nombre, carnet, contraseña, carpetaRaiz) {
    this.nombre = nombre;
    this.carnet = carnet;
    this.contraseña = contraseña;
    this.carpetaRaiz = carpetaRaiz;
  }

    getNombre() {
        return this.nombre;
    }

    getCarnet() {
        return this.carnet;
    }

    getContraseña() {
        return this.contraseña;
    }

    getCarpetaRaiz() {
        return this.carpetaRaiz;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setCarnet(carnet) {
        this.carnet = carnet;
    }

    setContraseña(contraseña) {
        this.contraseña = contraseña;
    }

    setCarpetaRaiz(carpetaRaiz) {
        this.carpetaRaiz = carpetaRaiz;
    }
}
export default Usuario;
