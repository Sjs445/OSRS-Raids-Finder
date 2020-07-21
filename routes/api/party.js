//  Required Modules
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//  Needed to connect to our MongoDB server
const keys = require("../../config/keys");

//  Load schema
const Party = require("../../models/party");

//  Validation function
const validateParty = require("../../validation/createParty");

//  @route GET api/party/all
//  @desc gets all parties available
//  @access Private
router.get("/all", auth, (req, res) =>{
    Party.find({}).then( party => {
        if(party) {
            return res.json({party});
        }
        else{
            return res.status(404).json("No posts found");
        }
    })
    .catch(err => console.log(err));
});

//  @route POST api/party/new
//  @desc creates a new party
//  @access Private
router.post("/new", auth, (req, res) => {
    const { errors, isValid, raidType, clanChat, users } = validateParty(req.body);

    //  If user input is not valid throw error
    if(!isValid) {
        return res.status(400).json({errors});
    }

    let partyObj = new Party({ raidType, clanChat, users });

    partyObj.save().then(data => {
        res.json(data);
    })
    .catch(er => console.log(err));
});

//  @route  DELETE api/party/:id
//  @desc   deletes a party by id
//  @access Private
router.delete("/:id", auth, (req, res) =>{
    Party.findById(req.params.id)
    .then(party => party.remove().then(() => res.json({success: "Party removed."})))
    .catch(err => res.status(404).json({failed: "Could not delete party"}))
});

module.exports = router;