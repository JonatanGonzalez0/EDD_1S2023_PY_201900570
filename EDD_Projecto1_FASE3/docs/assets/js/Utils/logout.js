var btn = document.getElementById("bnt-logout");

btn.addEventListener("click", function () {
  sessionStorage.removeItem("sesion");
  window.location.href = "./login.html";
});
