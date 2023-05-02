// Generar clave y IV una sola vez
// Comprueba si ya hay una clave almacenada en localStorage
let claveGuardada = localStorage.getItem("clave");
let ivGuardado = localStorage.getItem("iv");
let algoritmoGuardado = localStorage.getItem("algoritmo");

let clave;
let iv;
let algoritmo;
const enconder = new TextEncoder();

if (claveGuardada && ivGuardado && algoritmoGuardado) {
  // Si se encuentra una clave guardada, se decodifican los valores y se importan
  clave = new Uint8Array(
    atob(claveGuardada)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  iv = new Uint8Array(
    atob(ivGuardado)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  algoritmo = { name: "AES-GCM", iv: iv };
} else {
  // Si no se encuentra una clave guardada, se generan nuevos valores y se guardan en localStorage
  clave = new Uint8Array(16);
  crypto.getRandomValues(clave);
  iv = crypto.getRandomValues(new Uint8Array(16));
  algoritmo = { name: "AES-GCM", iv: iv };
  localStorage.setItem("clave", btoa(String.fromCharCode.apply(null, clave)));
  localStorage.setItem("iv", btoa(String.fromCharCode.apply(null, iv)));
  localStorage.setItem("algoritmo", JSON.stringify(algoritmo));
}

async function encriptacion(mensaje) {
  const data = enconder.encode(mensaje);

  const claveCrypto = await crypto.subtle.importKey(
    "raw",
    clave,
    "AES-GCM",
    true,
    ["encrypt"]
  );

  const mensajeCifrado = await crypto.subtle.encrypt(
    algoritmo,
    claveCrypto,
    data
  );

  const cifradoBase64 = btoa(
    String.fromCharCode.apply(null, new Uint8Array(mensajeCifrado))
  );

  return cifradoBase64;
}

async function desencriptacion(mensaje) {
  const mensajeCifrado = new Uint8Array(
    atob(mensaje)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const claveCrypto = await crypto.subtle.importKey(
    "raw",
    clave,
    "AES-GCM",
    true,
    ["decrypt"]
  );
  let mensajeDescifrado = "";
  try {
    mensajeDescifrado = await crypto.subtle.decrypt(
      algoritmo,
      claveCrypto,
      mensajeCifrado
    );
  } catch (error) {
    console.log(error);
  }

  const decoder = new TextDecoder();
  const mensajeOriginal = decoder.decode(mensajeDescifrado);

  return mensajeOriginal;
}

async function sha256(mensaje) {
  let cadenaFinal;
  const enconder = new TextEncoder();
  const mensajeCodificado = enconder.encode(mensaje);
  await crypto.subtle
    .digest("SHA-256", mensajeCodificado)
    .then((result) => {
      const hashArray = Array.from(new Uint8Array(result));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      cadenaFinal = hashHex;
    })
    .catch((error) => console.log(error));
  return cadenaFinal;
}

export { encriptacion, desencriptacion, sha256 };
