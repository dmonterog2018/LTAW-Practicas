//-- Cargar las dependencias
const socketServer = require('socket.io').Server;
const http = require('http');
const express = require('express');
const colors = require('colors');
const currentDate = new Date();
const PUERTO = 9000;


//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = new socketServer(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.redirect('/chat.html');
  });

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Tipos de mensaje que podemos recibir
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);

    if (msg == '/help') {
        socket.send("La lista de comandos para nuestro chat son los siguientes: /list, /user, /hello y /date");
    } else if(msg == '/list') {
      const users = 'Número de usuarios conectados: ' + io.engine.clientsCount;
      socket.send(users);

    } else if(msg == '/date') {
      
      const dateString = 'La fecha actual es: ' + currentDate.toLocaleDateString();
      socket.send(dateString);

    } else if(msg == '/hour') {

      const TimeString = 'La hora actual es: ' + currentDate.toLocaleTimeString();
      socket.send(TimeString);
    
    } else if(msg == '/hello') {

     socket.send('Bienvenido a nuestro chat, encantado de recibirte.')
    
    }else{ // Si no recibimos un mensaje de comando mandamos directamente un eco del mensaje para mostrar a los usuarios
        io.send(msg);
    }
 
    
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);