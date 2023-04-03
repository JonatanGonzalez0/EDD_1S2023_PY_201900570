
const bnt_makeVisiblePERMS = document.getElementById('makeVisiblePERMS');

bnt_makeVisiblePERMS.addEventListener('click', () => {
    //container-sec-Perms
    const container = document.getElementById('container-sec-Perms');
    //si la clase contiene visually-hidden
    if (container.classList.contains('visually-hidden')) {
        //remover la clase visually-hidden
        container.classList.remove('visually-hidden');
        //agregar la clase visually-shown
        container.classList.add('visually-shown');
    } else {
        //remover la clase visually-shown
        container.classList.remove('visually-shown');
        //agregar la clase visually-hidden
        container.classList.add('visually-hidden');
    }
});