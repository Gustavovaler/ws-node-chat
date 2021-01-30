const path = require('path')
const express = require ('express');
const app = express();
require('dotenv').config()
const SocketIO = require('socket.io')


//settings 
const port = process.env.PORT || 3000;

//middleware 
app.use(express.static(path.join(__dirname ,'../public')));

//server 

const server = app.listen(port , () => {
    console.log(`Server at port ${port}`);
})


// websockets
const io = SocketIO(server)


io.on( 'connection' , (socket) => {

    socket.on("chat:msg",(data) => {        
        io.emit("chat:msg", data)       
    });

    socket.on("chat:typing", (data) => {
       console.log(socket.broadcast.emit("chat:typing", data));
    });
})