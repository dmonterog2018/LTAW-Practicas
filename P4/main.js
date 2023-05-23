const electron = require('electron');


// MAIN

//-- Cargar las dependencias
const socketServer = require('socket.io').Server;
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');
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
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});


//-- El resto de peticiones como ficheros estáticos
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

    if (msg.split("/")[1] == 'help') {
        socket.send("La lista de comandos para nuestro chat son los siguientes: /list, /user, /hello y /date");
    } else if(msg.split("/")[1] == 'list') {
      const users = 'Número de usuarios conectados: ' + io.engine.clientsCount;
      socket.send(users);

    } else if(msg.split("/")[1] == 'date') {
      
      const dateString = 'La fecha actual es: ' + currentDate.toLocaleDateString();
      socket.send(dateString);

    } else if(msg.split("/")[1] == 'hour') {

      const TimeString = 'La hora actual es: ' + currentDate.toLocaleTimeString();
      socket.send(TimeString);
    
    } else if(msg.split("/")[1] == 'hello') {

     socket.send('Bienvenido a nuestro chat, encantado de recibirte.')
    
    }else{ // Si no recibimos un mensaje de comando mandamos directamente un eco del mensaje para mostrar a los usuarios
        io.send(msg);
        win.webContents.send('print', msg);
       
    }
 
    
  });

});
console.log("Arrancando electron...");
console.log(ip.address());

electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  
    
    win.loadFile('index.html');
    win.on('ready-to-show', () => {
      win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
    });
    
    electron.ipcMain.handle('test', async(event, mensaje) => {
      console.log("-> Mensaje: " + mensaje);
      //-- Enviar mensaje de prueba
      io.send('Enviando TEST...', mensaje);
      win.webContents.send('print', 'Enviando TEST...');
    
    });

});



//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);