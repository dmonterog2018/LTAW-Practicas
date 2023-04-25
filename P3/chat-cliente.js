//-- Elementos del interfaz
const button = document.getElementById("button");
const display = document.getElementById("display");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();



socket.on("connect", () => {
  //-- Enviar mensaje inicial
  socket.send("Te has conectado al chatPelinpe");
});  

socket.on("disconnect", ()=> {
  display.innerHTML="¡¡DESCONECTADO!!"
})

socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});


msg_entry.onchange = () => {
    if (msg_entry.value)
      socket.send(msg_entry.value);
    
    //-- Borrar el mensaje actual
    msg_entry.value = "";
  }