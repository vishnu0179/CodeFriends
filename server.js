const express = require('express')
const app = express()

const port = process.env.PORT  || 5500

app.get('/', (req, res)=> {
    res.send('Home');
})

app.get('/ping', (req, res)=> {
    res.send('Success')
})

app.listen(port, ()=>{
    console.log('app listening on', port);
})