// PRACTICA 1. TIENDA PROPIA DE COMIDA

// 1.Importamos los modulos url,fs y http para el servidor que nos piden 

const http = require('http');
const fs = require('fs');



// Creamos el servidor 

const PUERTO = 9000;
const PAGINA = 'tienda_comida.html';
const pagina_error = 'error_404.html';
const icono = 'favicon2.ico';
const fuente = 'monaco.ttf';
const error404 = fs.readFileSync(pagina_error);

function get_user(req) {

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      //-- Variable para guardar el usuario
      let user;
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'user') {
          user = valor;
        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return user || null;
      
    }
  }

const server = http.createServer((req, res) => {

    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("La URL del recurso es: " + myURL.href);
    const cookie = req.headers.cookie;
    
    
    if(cookie){    
    console.log("Cookie: " + cookie );

      }else{
        console.log("Petición sin cookie");
    }
        

    let cliente = "";
    if(myURL.pathname == '/'){
        cliente += PAGINA;
        console.log("Solicitado por el cliente: " + cliente);
        statusCode = 200;
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(error404);
                return res.end("404 Not Found");

                
            }else{

            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log("<=== 200 OK ===>");
            console.log("<=== Enviando pagina principal al cliente ===>");
            res.write(page);
            res.end();
            }
        
        });
        
        
    } else if (myURL.pathname == "/style.css" | myURL.pathname == "/style1.css" |myURL.pathname == "/style2.css"| myURL.pathname == "/style3.css" ) {
        cliente += myURL.pathname.split("/")[1];
        console.log("Solicitado CSS por el cliente: " + cliente);
        fs.readFile(cliente, (error, page) => {
            if (error) {
                
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
                
            }else{

            res.writeHead(200, {'Content-Type' : 'text/css'});
            console.log("<=== 200 OK ===>");
            console.log("<=== Enviado CSS al cliente ===>");
            res.write(page);
            res.end();
            }
        
        });

    } else if(myURL.pathname == "/favicon2.ico") {
        
        console.log("Solicitado favicon por el cliente: " + cliente);
        const favicon = fs.readFileSync(icono);
        res.writeHead(200, {'Content-Type': 'image/ico'});
        res.write(favicon);
        res.end();
        console.log("El archivo solicitado: " + icono + " ,ha sido insertado como icono");
        

    }else if(myURL.pathname == "/monaco.ttf") {
        
        console.log("Solicitado fuente por el cliente: " + cliente);
        const fonts = fs.readFileSync(fuente);
        res.writeHead(200, {'Content-Type': 'font/ttf'});
        res.write(fonts);
        res.end();
        console.log("El archivo solicitado: " + fuente + " ,ha sido insertado como fuente");
    
    } else if(myURL.pathname == "/producto1.html" | myURL.pathname == "/producto2.html" | myURL.pathname == "/producto3.html" | myURL.pathname == "/inicio.html") {
        const producto = myURL.pathname.split("/")[1];
        fs.readFile(producto, (error, pruductos) => {
        console.log("Solicitado producto por el cliente: " + cliente);
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log("<=== 200 OK ===>");
        console.log("<=== Enviado producto al cliente ===>");
        res.write(pruductos);
        res.end();
        });

    } else if(myURL.pathname == '/Fotos/producto_1.jpg' | myURL.pathname == '/Fotos/producto_2.jpg' | myURL.pathname == '/Fotos/producto_2.jpg' | myURL.pathname == '/Fotos/producto_3.jpg') {
        const split = myURL.href.split("9000/")[1];
        console.log(split);
        const imagenes = fs.readFileSync(split);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.write(imagenes);
        res.end();
        console.log('<=== Imagen producto solicitada ===>');



    }else if (myURL.pathname == '/login') {
        user_name = myURL.searchParams.get('usuario');
        user_pass = myURL.searchParams.get('contra');
        lista_json = fs.readFileSync("tienda.json");
        lista = JSON.parse(lista_json);
        lista["usuarios"].forEach(element => {
        if (user_name == element["usuario"] && user_pass == element["contra"]) {
            console.log("USUARIO CORRECTO");
            res.setHeader('Set-Cookie', "user = " + user_name);
            fs.readFile('tienda_comida.html', function (err, data) {
                if (err) throw err;
                let paginaPrincipal = data.toString();
                paginaPrincipal = paginaPrincipal.replace("<h2>USUARIO : NO REGISTRADO</h2>", "<h2>USUARIO INICIADO: " + user_name + "</h2>");
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(paginaPrincipal);
                res.end();
            });
            //cliente = cliente.replace("tienda_comida.html", "<a>USUARIO INICIADO: " + user_name + "</a>");
            //res.writeHead(302, { 'Location': '/' });
            //res.end();
            
            
            //console.log("User: " + user);

        } else {
            console.log("Usuario o contraseña incorrecta");
        }
        });
    
    }else {
        code = 404;
        code_msg = "Not Found";
        console.log("Error 404. Pagina no encontrada");
        console.log(myURL.pathname.split("/")[2]);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(error404);
        return res.end("404 Not Found");
    }


});


console.log("<====== TIENDA ACTIVADA =====>");
console.log("<====== MODULOS DE COMIDA CARGADOS =====>");
console.log("<====== ESCUCHANDO EN EL PUERTO: " + PUERTO + " =====>");
console.log("<====== ESPERANDO CLIENTE =====>");


server.listen(PUERTO);
