const bnt_makeVisiblePERMS = document.getElementById("makeVisiblePERMS");

bnt_makeVisiblePERMS.addEventListener("click", () => {
  //container-sec-Perms
  const container = document.getElementById("container-sec-Perms");
  //si la clase contiene visually-hidden
  if (container.classList.contains("visually-hidden")) {
    //remover la clase visually-hidden
    container.classList.remove("visually-hidden");
    //agregar la clase visually-shown
    container.classList.add("visually-shown");
  } else {
    //remover la clase visually-shown
    container.classList.remove("visually-shown");
    //agregar la clase visually-hidden
    container.classList.add("visually-hidden");
  }
});

const btn_makeChatVisible = document.getElementById("ChatVisibility");

btn_makeChatVisible.addEventListener("click", () => {
  const container = document.getElementById("containerChat");

  if (container.classList.contains("visually-hidden")) {
    container.classList.remove("visually-hidden");
    container.classList.add("visually-shown");
  } else {
    container.classList.remove("visually-shown");
    container.classList.add("visually-hidden");
  }
});

const cerrarViewTXT = document.getElementById("cerrarViewTXT");

cerrarViewTXT.addEventListener("click", () => {
  const RowViewTXT = document.getElementById("RowViewTXT");
  RowViewTXT.classList.remove("visually-shown");
  RowViewTXT.classList.add("visually-hidden");
  const sectionReportes = document.getElementById("sectionReportes");
  //hacer visible el sectionReportes
  sectionReportes.classList.remove("visually-hidden");
  sectionReportes.classList.add("visually-shown");
});

const cerrarViewIMG = document.getElementById("cerrarViewIMG");

cerrarViewIMG.addEventListener("click", () => {
  const RowViewIMG = document.getElementById("RowViewIMG");
  RowViewIMG.classList.remove("visually-shown");
  RowViewIMG.classList.add("visually-hidden");
  const sectionReportes = document.getElementById("sectionReportes");
  //hacer visible el sectionReportes
  sectionReportes.classList.remove("visually-hidden");
  sectionReportes.classList.add("visually-shown");
});

const cerrarViewPDF = document.getElementById("cerrarViewPDF");

cerrarViewPDF.addEventListener("click", () => {
  const RowViewPDF = document.getElementById("RowViewPDF");
  RowViewPDF.classList.remove("visually-shown");
  RowViewPDF.classList.add("visually-hidden");
  const sectionReportes = document.getElementById("sectionReportes");
  //hacer visible el sectionReportes
  sectionReportes.classList.remove("visually-hidden");
  sectionReportes.classList.add("visually-shown");
});
