// PRACTICA 1. TIENDA PROPIA DE COMIDA

// 1.Importamos los modulos url,fs y http para el servidor que nos piden 

const http = require('http');
const fs = require('fs');
const url = require('url');


// Creamos el servidor 

const PUERTO = 9001;
const PAGINA = 'tienda_comida.html';
const ESTILO = 'style.css';
const pagina_error = 'error_404.html';
const icono = 'favicon2.ico';
const fuente = 'monaco.ttf';

const mine = {
    "html" : "text/html",
    "css" : "text/css",
    "ico" : "image/ico",
    "jpg" : "image/jpg",
    "ttf" : "font/ttf"
};
const error404 = fs.readFileSync(pagina_error);
const server = http.createServer((req, res) => {

    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("La URL del recurso es: " + myURL.href);
    
    let cliente = "";
    if(myURL.pathname == '/'){
        cliente += PAGINA;
        console.log("Solicitado por el cliente: " + cliente);
        statusCode = 200;
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': mine});
                res.write(error404);
                return res.end("404 Not Found");

                
            }else{

            res.writeHead(200, {'Content-Type': mine});
            console.log("<=== 200 OK ===>");
            console.log("<=== Enviando pagina principal al cliente ===>");
            res.write(page);
            res.end();
            }
        
        });
        
        
    } else if (myURL.pathname == "/style.css") {
        cliente += ESTILO;
        console.log("Solicitado CSS por el cliente: " + cliente);
        fs.readFile(ESTILO, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': mine});
                return res.end("404 Not Found");
                
            }else{

            res.writeHead(200, {'Content-Type': mine});
            console.log("<=== 200 OK ===>");
            console.log("<=== Enviado CSS al cliente ===>");
            res.write(page);
            res.end();
            }
        
        });

    } else if(myURL.pathname == "/favicon2.ico") {
        
        console.log("Solicitado favicon por el cliente: " + cliente);
        const favicon = fs.readFileSync(icono);
        res.writeHead(200, {'Content-Type': mine});
        res.write(favicon);
        res.end();
        console.log("El archivo solicitado: " + icono + " ,ha sido insertado como icono");
        

    }else if(myURL.pathname == "/monaco.ttf") {
        
        console.log("Solicitado fuente por el cliente: " + cliente);
        const fonts = fs.readFileSync(fuente);
        res.writeHead(200, {'Content-Type': mine});
        res.write(fonts);
        res.end();
        console.log("El archivo solicitado: " + fuente + " ,ha sido insertado como fuente");
    
    } else {
        code = 404;
        code_msg = "Not Found";
        console.log("Error 404. Pagina no encontrada");
        res.writeHead(404, {'Content-Type': mine});
        res.write(error404);
        return res.end("404 Not Found");
    }
    



});

// Sacamos el recurso de los archivos solicitados

//recurso = cliente.split(".")[1];
//console.log("Recurso solicitado por el cliente: " + cliente);


// Activamos la escucha y mensaje de activación

console.log("<====== TIENDA ACTIVADA =====>");
console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");
console.log("<====== ESPERANDO CLIENTE =====>");


server.listen(PUERTO);
