// PRACTICA 1. TIENDA PROPIA DE COMIDA

// 1.Importamos los modulos url,fs y http para el servidor que nos piden 

const http = require('http');
const fs = require('fs');
const url = require('url');


// Creamos el servidor 

const PUERTO = 9001;
const PAGINA = 'tienda_comida.html';
const ESTILO = 'style.css';
const pagina_error = 'error_404,jpg';

const mine = {
    "html" : "text/html",
    "css" : "text/css",
    "ico" : "image/ico"
};

const server = http.createServer((req, res) => {

    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("La URL del recurso es: " + myURL.href);
    
    let cliente = "";
    console.log(myURL.pathname);
    if(myURL.pathname == '/'){
        cliente += PAGINA;
        console.log("Solicitado por el cliente: " + cliente);
        statusCode = 200;
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': mine});
                return res.end("404 Not Found");
                
            }else{

            res.writeHead(200, {'Content-Type': mine});
            console.log("200 OK");
            console.log("Enviando pagina principal al cliente");
            res.write(page);
            res.end();
            }
        
        });
        
        
    } else if (myURL.pathname == "/style.css") {
        cliente += ESTILO;
        console.log("Solicitado CSS: " + cliente);
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': mine});
                return res.end("404 Not Found");
                
            }else{

            res.writeHead(200, {'Content-Type': mine});
            console.log("200 OK");
            console.log("Enviando CSS al cliente");
            res.write(page);
            res.end();
            }
        
        });

    } else if(myURL.pathname == "/favicon.ico") {
        file = 'favicon.ico'
        console.log("ENTRAS?");
        res.writeHead(200, {'Content-Type': mine});
        console.log("200 OK")


    } else {
        code = 404;
        code_msg = "Not Found";
        console.log("ERROR");
        page = pagina_error;
    }
    

// Sacamos el recurso de los archivos solicitados

//recurso = cliente.split(".")[1];
//console.log("Recurso solicitado por el cliente: " + cliente);

});

// Activamos la escucha y mensaje de activación

console.log("<====== TIENDA ACTIVADA =====>");
console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");
console.log("<====== ESPERANDO CLIENTE =====>");


server.listen(PUERTO);

