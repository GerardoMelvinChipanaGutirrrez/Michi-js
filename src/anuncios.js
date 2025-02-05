export function mostrarMensaje(mensaje) {
    const labelWin = document.querySelector(".label-Win");
    labelWin.innerHTML = `<h1>${mensaje}</h1>`;
}
