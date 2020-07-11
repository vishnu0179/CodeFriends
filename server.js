const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const user = require('./routes/user')
const auth = require('./routes/auth.js')

app.set('port', (process.env.PORT || 5000));

app.use(express.json())

app.use('/', auth)
app.use('/user', user);


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


app.get('/ping',(req, res)=> {
    res.send("Successful")
})


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});