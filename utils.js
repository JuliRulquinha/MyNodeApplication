
var fs = require('fs/promises');

const utils = (function(){
    
    function writeToCsv(){
        
        console.log("I'm working");

    }

    async function readFromCsv(fileName){
    
        let result = await fs.readFile(fileName);
        return result.toString();
      
    }
    
    
    return {
        readFromCsv
    }

})();
    


module.exports = utils;
// module.exports = isValid;

