console.log("Hola desde el proceso de la web...");
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

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;
info4.textContent = 'http://' + ip.address() + ':9000/chat.html';


btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");
    
}


qrcode.toString(qrCodeText, { type: 'terminal' }, (err, qrCode) => {
  if (err) {
    console.error(err);
  } else {
    console.log(qrCode);
  }
});