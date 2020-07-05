const axios = require('axios')
const CircularJSON = require('circular-json')
module.exports = async(username) => {
    let result, data;
    try{
        let url = "http://codeforces.com/api/user.info?handles=" + username
         result = await axios.get(url);
         data = CircularJSON.stringify(result)
         console.log(typeof(data))
    }
    catch(err) {
        console.log(err);
    }
    
    return data;
}
