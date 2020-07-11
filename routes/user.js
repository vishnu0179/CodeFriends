const express = require('express')
const router = express.Router()

const checkUser = require('../scripts/checkUser')
const checkProblemStatus = require('../scripts/getProblemStatus')
const getUserContests = require('../scripts/getUserContestHistory')


router.get('/:id', async (req, res)=>{
    let userName  = req.params.id
        
    let result = await checkUser(userName);
    let data = await JSON.parse(result)
    //console.log(data)
    res.send(data.data)

})

// /user/problemStatus/vishnu0179?contest=1374&problem=A
router.get('/problemStatus/:id',async (req, res)=> {

    let handle = req.params.id;
    let contestId = req.query.contest;
    let problem = req.params.problem;

    let probStatus = await checkProblemStatus(handle, contestId, problem);

    let resultObj = {
        'status': probStatus
    }

    

    res.send(resultObj)

})

router.get('/contests/:id',async (req, res)=>{

    let handle = req.params.id;
    let contestHistory = await getUserContests(handle);

    let result = await JSON.parse(contestHistory);

    res.send(result)

})

module.exports = router