// PRACTICA 1. TIENDA PROPIA DE COMIDA

// 1.Importamos los modulos url,fs y http para el servidor que nos piden 

const http = require('http');
const fs = require('fs');
const url = require('url');


// Creamos el servidor 

const PUERTO = 9000;
const PAGINA = 'tienda_comida.html';
const ESTILO = 'tienda_comida.css';

const server = http.createServer((req, res) => {
    console.log("Petición recibida del cliente!");
    console.log("Esperando respuesta del servidor...");


});

// Activamos la escucha y mensaje de activación
server.listen(PUERTO);

console.log("<====== TIENDA ACTIVADA =====>");
console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");


