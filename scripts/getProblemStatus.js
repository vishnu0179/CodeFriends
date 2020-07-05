const axios = require('axios')

async function isProblemSolved (handle,ContestId,Index)
{
  let url = "https://codeforces.com/api/user.status";
  let result = await axios.get(url, {
    params : {
      handle:handle
    }
  });
  var flag=0;
  let probStatus = "NOT SUBMITTED";
  for(var x=0; x<result.data["result"].length; x++)
  {
    var contestid=result.data["result"][x]["problem"]["contestId"]; //contestid contains name of the contestid
    var index=result.data["result"][x]["problem"]["index"]; //index contains A,B,C,D
    var verdict=result.data["result"][x]["verdict"]; //verdict contains verdict
   
    
    if(contestid==parseInt(ContestId) && index==Index && verdict=="OK") // to check if problem is submitted or not
    {
      console.log("SUBMITTED");
      probStatus = "SUBMITTED"
      flag=1;
      break;
    }
  }
  if(flag==0)
  {
    console.log("NOT SUBMITTED") //Flag=0 ->not submitted    flag=1 -> submitted
    probStatus = "NOT SUBMITTED"
  }

  return probStatus;
    
}

module.exports = isProblemSolved;