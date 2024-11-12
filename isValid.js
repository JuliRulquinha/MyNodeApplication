function isValid(person){
    if(person.FirstName === undefined || person.FirstName === ""){
        return false;
    }else if(person.LastName === undefined || person.LastName === ""){
        return false;
    }else if(person.Email === undefined || person.Email === ""){
        return false;
    }else if(person.PhoneNumber === undefined || person.PhoneNumber === ""){
        return false;
    }else if(person.Address === undefined || person.Address === ""){
        return false;
    }else if(person.City === undefined || person.City === ""){
        return false;
    }else{
        return true;
    }
}

module.exports = isValid;