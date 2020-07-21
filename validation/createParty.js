const xssFilters = require("xss-filters");
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateParty(data) {
    //  Create Object for errors 
    let errors = {};
    //  Create new array of users for filtering
    let users = [];

    // Convert empty fields to an empty string so we can use validator functions
    data.raidType = !isEmpty(data.raidType) ? data.raidType : "";
    data.clanChat = !isEmpty(data.clanChat) ? data.clanChat : "";
    
    //  Filter for xss attacks
    let raidType = xssFilters.inHTMLData(data.raidType);
    let clanChat = xssFilters.inHTMLData(data.clanChat);

    //  Validate if there is empty data being submit
    if(validator.isEmpty(raidType)) {
        errors.raidType = "Please enter a raid type.";
    }

    if(validator.isEmpty(clanChat)) {
        errors.clanChat = "Please enter a clan chat.";
    }

    if(data.users.length === 0) {
        errors.users = "Error, no users in party.";
    }
    else {
        
        for(let i=0; i<data.users.length; i++) {
            users[i] = xssFilters.inHTMLData(data.users[i]);
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
        raidType,
        clanChat,
        users
    }
}