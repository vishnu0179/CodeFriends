const axios = require('axios')
const CircularJSON = require('circular-json')


let url = "https://codeforces.com/api/user.rating";

let contestHistory = async (handle) => {
    
    let result = await axios.get(url, {
        params: {
            handle: handle
        }
    });

    var allcontests=[];
    
    var numberofcontests=result.data["result"].length;
    for(var x=0; x < numberofcontests ; x++)
    {
        var onecontest=[]
      onecontest.push(result.data["result"][x]["contestName"]); //allcontests contains list of names of contests                                                                 //can change "contestName" to "contestId" also
      onecontest.push(result.data["result"][x]["oldRating"]);
      onecontest.push(result.data["result"][x]["newRating"]);
      onecontest.push(result.data["result"][x]["newRating"] - result.data["result"][x]["oldRating"]);
      
      allcontests.push(onecontest);
    }

    console.log(typeof(allcontests))
    console.log(allcontests[0])

    let resString = await CircularJSON.stringify(allcontests);

    return resString;
}

module.exports = contestHistory