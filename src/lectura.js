import { verificarGanador } from "./verificar.js";
import { mostrarMensaje } from "./anuncios.js";

// Variables globales
let actGame = true;
let turno = 1;  // 1 = X, 0 = O
let totalClicks = 0;
const tablero = new Array(9).fill(null);

const casillas = document.querySelectorAll(".casilla");
const labelWin = document.querySelector(".label-Win");
const marcadorX = document.querySelector(".marc-X");
const marcadorO = document.querySelector(".marc-O");
const btnReset = document.getElementById("btnReset");

function actualizarTurno() {
    if (actGame) {
        labelWin.innerHTML = `<h1>Turno de ${turno === 1 ? 'X' : 'O'}</h1>`;
    }
}

actualizarTurno(); // Mostrar el turno inicial

casillas.forEach((btn, i) => {
    btn.addEventListener("click", async () => { // <- AHORA ES ASÍNCRONA
        if (!actGame || btn.innerText !== "") return;

        btn.innerText = turno === 1 ? "X" : "O";
        tablero[i] = turno === 1 ? "X" : "O";
        totalClicks++;

        const hayGanador = await verificarGanador(tablero); // <- ESPERAMOS LA RESPUESTA

        if (hayGanador) {
            actGame = false;
            mostrarMensaje(`¡Ganó ${turno === 1 ? "X" : "O"}!`);
            if (turno === 1) marcadorX.textContent = parseInt(marcadorX.textContent) + 1;
            else marcadorO.textContent = parseInt(marcadorO.textContent) + 1;
        } else if (totalClicks === 9) {
            actGame = false;
            mostrarMensaje("¡Empate!");
        } else {
            turno = turno === 1 ? 0 : 1;
            actualizarTurno();
        }
    });
});


btnReset.addEventListener("click", () => {
    tablero.fill(null);
    casillas.forEach(btn => (btn.innerText = ""));
    totalClicks = 0;
    actGame = true;
    turno = 1;
    actualizarTurno();
});
