console.log("Hola desde el proceso de la web...");
const electron = require('electron');
const ip = require('ip');
const qrcode = require('qrcode');
const localIPAddress = ip.address();
const qrCodeText = `http://${localIPAddress}`;
//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const info7 = document.getElementById("info7");
const qr = document.getElementById("qr");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;
info5.textContent = process.arch;
info6.textContent = process.platform;
info7.textContent = process.cwd();
qrdata = qrCodeText + ':9000/chat.html';


electron.ipcRenderer.on('ip', (event, msg) => {
  console.log("Recibida Ip: " + msg);
  info4.innerHTML = msg + '/chat.html';
  info4.href = msg + '/chat.html';
});

btn_test.onclick = () => {
  console.log("Botón ON!");
  //-- Enviar mensaje al proceso principal
  electron.ipcRenderer.invoke('test', "Este mensaje es de prueba!!");
}

electron.ipcRenderer.on('print', (event, msg) => {
  console.log("Recibido: " + msg);
  display.innerHTML += msg + '</p>'; 
});

qrcode.toDataURL(qrdata, (err, qrCodeDataURL) => {
  if (err) {
    console.log(err);
  } else {
    qr.setAttribute('src', qrCodeDataURL);
  }
});

