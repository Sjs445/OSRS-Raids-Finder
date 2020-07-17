//  Required Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Needed to connect to our MongoDB server
const keys = require("../../config/keys");

//  Load Schema
const User = require("../../models/user");
//  Import Validation Functions
const validateLogin = require("../../validation/login");
const validateRegister = require("../../validation/register");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) =>{

    //  Retrieve any possible errors from the validation file.
    //  We also retrive name, email, rsn, and password because we want to
    //  use the XSS Filtered inputs that we already filtered in the validation file.
    //  isValid tells us if we have any errors.
    const { errors, isValid, name, email, rsn, password } = validateRegister(req.body);

    //  Check if all input is valid
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //  Check if user already exists otherwise create new user
    User.findOne({email: email}).then( user => {
        if(user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else {
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                rsn: rsn
            });

            //  Generate 10 rounds of salting and hash.
            //  Hash password before storing in MongoDB.
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => 
                            jwt.sign(
                                {id: user.id },
                                keys.jwtSecret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )                            
                        )
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user
// @access Public
router.post("/login", (req, res) =>{
    const { errors, isValid, email, password } = validateLogin(req.body);

    //  If user input is not valid throw error
    if(!isValid) {
        return res.status(400).json({ errors })
    }
    
    //  Look for user by email and the compare the password.
    User.findOne({email: email}).then( user => {
        if(!user) {
            return res.status(400).json( { user: "Does not exist!" });
        }
        else {
            bcrypt.compare(password, user.password, (error, result) => {
                if(result) {
                    jwt.sign(
                        {id: user.id },
                        keys.jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            console.log(user.name+" login success")
                            res.json({
                                token: token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                }
                else {
                    return res.status(400).json( {error: "Incorrect Password!"});
                }
            });
        }
    });
});

module.exports = router;