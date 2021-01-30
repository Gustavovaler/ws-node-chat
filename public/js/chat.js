
//sert name 
let nick = prompt('Ingresa tu nick');
if(nick != ''){
    document.getElementById('header').innerHTML = nick;
}else{
    nick = "Anónimo";
}


// DOM elements

let chatBox = document.getElementById('chat-box');
let isTyping = document.getElementById('is-typing');
let msg = document.getElementById('text-box');
let sendButton = document.getElementById('btn-send');

// socket
const socket = io();

sendButton.addEventListener('click', () =>{
    socket.emit('chat:msg', {name: nick, msg: msg.value})
    msg.value = '';
});

socket.on("chat:msg", (data) => {
    isTyping.innerHTML = "";
    if(data.name == nick){
        chatBox.innerHTML += `<p class="msg own-msg"><strong> ${data.name} </strong> : ${data.msg} </p>`;
    }else{
        chatBox.innerHTML += `<p class="msg other-msg"><strong> ${data.name} </strong> : ${data.msg} </p>`;
    }    
});

socket.on("chat:typing", (data) => {
   isTyping.innerHTML = `<p><strong> ${data.nick} </strong> esta escribiendo ...`
});

msg.addEventListener('keypress', () =>{
    socket.emit("chat:typing", {nick});
});
