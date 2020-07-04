const express = require('express')
const app = express()

const SocketServer = require('websocket').server;

const http = require('http').Server(app);

const server = http.createServer(app);

const port = process.env.PORT  || 5500

const user = require('./routes/user')
const connections=[]
app.use('/user' ,user);

app.use(express.json());

wsServer = new SocketServer({httpServer:server})


wsServer.on('request',(req)=>{
    const connection=req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message',(mes)=>{
        connections.forEach(element => {
            if(element!=connection)
                element.sendUTF(mes.utf8Data)
        })
    })

    connection.on('close',(resCode,des)=>{
        console.log('connection closed')
        connections.splice(connections.indexOf(connection),1)
    })
})


app.get('/ping', (req, res)=> {
    res.send('Success')
})

app.listen(port, ()=>{
    console.log('app listening on', port);
})