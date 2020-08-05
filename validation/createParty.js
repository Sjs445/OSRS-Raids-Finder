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
    data.partyLeader = !isEmpty(data.partyLeader) ? data.partyLeader : "";
    data.userid = !isEmpty(data.userid) ? data.userid: "";
    
    //  Filter for xss attacks
    let raidType = xssFilters.inHTMLData(data.raidType);
    let clanChat = xssFilters.inHTMLData(data.clanChat);
    let partyLeader = xssFilters.inHTMLData(data.partyLeader);
    let userid = xssFilters.inHTMLData(data.userid);

    //  Validate if there is empty data being submit
    if(validator.isEmpty(raidType)) {
        errors.raidType = "Please enter a raid type.";
    }

    if(validator.isEmpty(clanChat)) {
        errors.clanChat = "Please enter a clan chat.";
    }

    if(validator.isEmpty(partyLeader)) {
        errors.partyLeader = "Error, no party leader found.";
    }
    else {
        users.push({_id: userid, rsn: partyLeader});
    }

    return {
        errors,
        isValid: isEmpty(errors),
        raidType,
        clanChat,
        users,
        partyLeader
    }
}