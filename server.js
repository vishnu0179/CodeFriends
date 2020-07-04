const express = require('express')
const app = express()

const port = 5500 || process.env.PORT

app.get('/ping', (req, res)=> {
    res.send('Success')
})

app.listen(port, ()=>{
    console.log('app listening on', port);
})