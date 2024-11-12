
const util={
    readFromCsv,
    writeToCsv
}

async function readFromCsv(fileName){
    
    let result = await fs.readFile(fileName);
    return result.toString();
  
}

function writeToCsv(){
    console.log("I'm working");
}


var fs = require('fs/promises');
module.exports = util;
// module.exports = isValid;