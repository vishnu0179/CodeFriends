const express = require('express')
const app = express()


var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT  || 5500

const user = require('./routes/user')

app.use('/user' ,user);

app.use(express.json());


io.on('connection', function(socket){

    console.log('User Conncetion');
  
    socket.on('connect user', function(user){
      console.log("Connected user ");
      io.emit('connect user', user);
    });
  
    socket.on('on typing', function(typing){
      console.log("Typing.... ");
      io.emit('on typing', typing);
    });
  
    socket.on('chat message', function(msg){
      console.log("Message " + msg['message']);
      io.emit('chat message', msg);
    });
  });

app.get('/ping', (req, res)=> {
    res.send('Success')
})

app.listen(port, ()=>{
    console.log('app listening on', port);
})