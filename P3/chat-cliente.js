//-- Elementos del interfaz
const button = document.getElementById("button");
const display = document.getElementById("display");
const usuario = document.getElementById("usuario");
//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
let username = "";

usuario.onchange = (event) => {
  event.preventDefault();
  if (usuario.value) {
    username = usuario.value;
    console.log(username);
    socket.send(username);
  }
  usuario.value = "";
}

socket.on("connect", () => {
  //-- Enviar mensaje inicial
  socket.send("Alguien se unió al chat");
});  

socket.on("disconnect", ()=> {
  display.innerHTML="¡¡DESCONECTADO!!"
})

socket.on("message", (msg)=>{
  if (msg == username) {
    display.innerHTML += '<p style="color:green">' + '· Te has registrado en el chat como: ' + username +'</p>';

  }else if (msg !==username){
    display.innerHTML += '<p style="color:blue">' + '· ' + msg + '</p>';
  }
});


msgentry.onchange = () => {
    if (msgentry.value)
    mensaje = username + ":" + msgentry.value;
    socket.send(mensaje);
    
    // Borrar el mensaje actual
    msgentry.value = "";
  }