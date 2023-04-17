export default class Usuario {
  constructor(nombre, carnet, password, CarpetaRaiz) {
    this.nombre = nombre;
    this.carnet = carnet;
    this.password = password;
    this.CarpetaRaiz = CarpetaRaiz;
  }

    getNombre() {
        return this.nombre;
    }

    getCarnet() {
        return this.carnet;
    }

    getpassword() {
        return this.password;
    }

    getCarpetaRaiz() {
        return this.CarpetaRaiz;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setCarnet(carnet) {
        this.carnet = carnet;
    }

    setpassword(password) {
        this.password = password;
    }

    setCarpetaRaiz(CarpetaRaiz) {
        this.CarpetaRaiz = CarpetaRaiz;
    }
}
