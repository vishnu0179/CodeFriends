const express = require('express')
const router = express.Router()
const checkU = require('../scripts/checkUser')

router.get('/:id', async (req, res)=>{
    let userName  = req.params.id
        
    let result = await checkU(userName);
    let data = await JSON.parse(result)
    console.log(data)
    res.send(data.data)

})

module.exports = router