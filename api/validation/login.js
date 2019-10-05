const validate = require('validator');
const isEmpty = require('is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};
    console.log(data + "\n");
    console.log(data.email);
    console.log(data.password);
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(validate.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }else if(!validate.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }

    if(validate.isEmpty(data.password)) {
        errors.password = "Password is required!"
    }
    //console.log('Inne');
    console.log(errors);
    return {
    errors,
    isValid: isEmpty(errors)

    };
};