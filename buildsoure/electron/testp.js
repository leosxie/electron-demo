const {ipcRenderer} = require('electron')
function init(){
  //监听mian process里发出的message
  ipcRenderer.on('asynchronous-reply', (event, arg) => {
     alert("web2" + arg);// prints "pong"  在electron中web page里的console方法不起作用，因此使用alert作为测试方法
  })
}

function sayHello(){  
 //在web page里向main process发出message
 ipcRenderer.send('asynchronous-message', 'ping from web page') // prints "pong" 
  alert("web1" + 'ping');
}