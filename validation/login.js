//  Required Modules
const xssFilters = require("xss-filters");
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogin(data) {
    //  Create Object for errors 
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //  Filter req.body with xssFilters to avoid XSS attacks
    let email = xssFilters.inHTMLData(data.email);
    let password = xssFilters.inHTMLData(data.password);

    //  Check if empty email or incorrect email format
    if(validator.isEmpty(email)) {
        errors.email = "Email is required.";
    }
    else if(!validator.isEmail(email)) {
        errors.email = "Invalid email.";
    }

    //  Password check if empty field
    if(validator.isEmpty(password)) {
        errors.password = "Password is required.";
    }

    //  Return our errors and isValid object
    return{
        errors,
        isValid: isEmpty(errors),
        email,
        password
    }
};