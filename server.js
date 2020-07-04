const express = require('express')
const app = express()

const port = process.env.PORT  || 5500

const user = require('./routes/user')

app.use('/user' ,user);

app.use(express.json());

app.get('/ping', (req, res)=> {
    res.send('Success')
})

app.listen(port, ()=>{
    console.log('app listening on', port);
})