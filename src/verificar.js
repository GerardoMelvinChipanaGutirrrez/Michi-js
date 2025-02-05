export function verificarGanador(tablero) {
    return fetch("./src/config.json")
        .then(response => response.json())
        .then(data => {
            return data.combinacionesGanadoras.some(combinacion => {
                const [a, b, c] = combinacion;
                return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
            });
        });
}
