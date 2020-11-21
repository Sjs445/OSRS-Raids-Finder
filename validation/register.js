//  Required Modules
const xssFilters = require("xss-filters");
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validRegister(data) {
    //  Create Object for errors 
    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.rsn = !isEmpty(data.rsn) ? data.rsn: "";

    //  Filter req.body with xssFilters to avoid XSS attacks
    let email = xssFilters.inHTMLData(data.email);
    let password = xssFilters.inHTMLData(data.password);
    let password2 = xssFilters.inHTMLData(data.password2);
    let name = xssFilters.inHTMLData(data.name);
    let rsn = xssFilters.inHTMLData(data.rsn);

    let isGuide = data.isGuide;

    //  Check for empty name
    if(validator.isEmpty(name)) {
        errors.name = "Name is required.";
    }

    //  Check for empty email and valid email address
    if(validator.isEmpty(email)) {
        errors.email = "Email is required.";
    }
    else if(!validator.isEmail(email)) {
        errors.email = "Invalid Email.";
    }

    //  Check for RSN
    if(validator.isEmpty(rsn)) {
        errors.rsn = "RSN required.";
    }

    //  Check for empty passwords, length, matching...
    if(validator.isEmpty(password)) {
        errors.password = "Password is required.";
    }
    if(validator.isEmpty(password2)) {
        errors.password2 = "Confirm password is required.";
    }
    if(!validator.isLength(password, {min: 6, max: 30})) {
        errors.password = "Password length must be at least 6 characters.";
    }
    if(!validator.equals(password, password2)) {
        errors.password2 = "Passwords do not match.";
    }
    return {
        errors,
        isValid: isEmpty(errors),
        name,
        email,
        rsn,
        password,
        isGuide
    };  
};