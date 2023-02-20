// PRACTICA 1. TIENDA PROPIA DE COMIDA

// 1.Importamos los modulos url,fs y http para el servidor que nos piden 

const http = require('http');
const fs = require('fs');
const url = require('url');


// Creamos el servidor 

const PUERTO = 9000;
const PAGINA = 'tienda_comida.html';
const ESTILO = 'tienda_comida.css';
const pagina_error = 'error_404,jpg';

const mine = {
    "html" : "text/html",
    "css" : "text/css"
};

const server = http.createServer((req, res) => {
    console.log("<====== TIENDA ACTIVADA =====>");
    console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
    console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");
    console.log("<====== ESPERANDO CLIENTE =====>");

    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("La URL del recurso es: " + myURL.href);
    
    let cliente = "";
    console.log(myURL.pathname);
    if(myURL.pathname == '/'){
        cliente += PAGINA;
        console.log(cliente);
        statusCode = 200;
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': mine});
                return res.end("404 Not Found");
            }

            res.writeHead(200, {'Content-Type': mine});
            res.write(page);
            res.end();
        });
        
        
        
    } else if(myURL.pathname == "/favicon.ico") {
        console.log("No existe icono pequeño");


    } else {
        code = 404;
        code_msg = "Not Found";
        console.log("ERROR")
        page = pagina_error;
    }
    

// Sacamos el recurso de los archivos solicitados

recurso = cliente.split(".")[1];
console.log("Recurso solicitado por el cliente: " + cliente);

});

// Activamos la escucha y mensaje de activación
server.listen(PUERTO);

console.log("<====== TIENDA ACTIVADA =====>");
console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");
console.log("<====== ESPERANDO CLIENTE =====>");



