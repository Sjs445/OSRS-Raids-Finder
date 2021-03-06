//  Required Modules
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//  Needed to connect to our MongoDB server
const keys = require("../../config/keys");

//  Load schema
const Party = require("../../models/party");
const User = require("../../models/user");

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
    //  Scrubbing user input for XSS or bad input
    const { errors, isValid, raidType, clanChat, users, partyLeader } = validateParty(req.body);

    //  If user input is not valid throw error
    if(!isValid) {
        return res.status(400).json({errors});
    }

    
    User.findById(users[0]._id).then(userResult => {
        if(userResult) {
            Object.defineProperty(users[0], 'isGuide', {
                value: userResult.isGuide,
                enumerable: true,
                writable: false
            })


            let partyObj = new Party({ raidType, clanChat, users, partyLeader });

            //  Create party and assign party id to the user who created it
            partyObj.save().then(data => {
                        userResult.updateOne({party: data._id}).then(() => {
                            res.json(data);
                        })

            })
            .catch(err => console.log(err));

        }
    })
    .catch(error => console.log(error))

    

    
});

//  @route  POST api/party/:id
//  @desc   adds user to the party
//  @access Private
router.post("/:id", auth, (req, res) => {

    if(!req.body.rsn || !req.body.userid) {
        return res.json({error: "Invalid Body. Could not add user to party."});
    }

    User.findById(req.body.userid).then(userResult => {
        Party.findByIdAndUpdate({_id: req.params.id}, {$push: {users: {_id: req.body.userid, rsn: req.body.rsn, isGuide: req.body.isGuide}}}, {new: true},
            function(err, party) {
                if(err) {
                    console.log(err);
                    return;
                }
                userResult.updateOne({party: party._id}).then(() => res.json({party})).catch(error => console.log(error));
                return;
            })
    }).catch(err => console.log(err))

});

//  @route  DELETE api/party/:id/:userid
//  @desc   deletes a party by id and removes party from all users.
//  @access Private
router.delete("/:id", auth, (req, res) =>{
    Party.findById(req.params.id)
    .then(party => party.deleteOne().then((party) => {
        for(let i=0; i<party.users.length; i++) {
            User.findOne({_id: party.users[i]._id}).then(user => {
                if(user) {
                    user.updateOne({party: null}).catch(err => console.log(err))
                }
            }).catch(err => console.log(err));
        }
        res.json({success: "Party Removed"});
    })
    )
    .catch(err => res.status(404).json(err))
});

//  @route  POST api/party/remove/:id
//  @desc   Removes 1 user from party. Only should be called if party has more than 1 user.
//  @access Private
router.post("/remove/:id", auth, (req, res) => {
    Party.findByIdAndUpdate({_id: req.params.id}, {$pull: {users: {_id: req.body.userid}}}, {new: true},
        (err, party) => {
            if(err) {
                console.log(err);
                return;
            }
            User.findOne({_id: req.body.userid}).then(user => user.updateOne({party: null}).then(() => res.json({party})).catch(error => console.log(error)))
        })
});

//  @route  POST api/party/changeleader/:id
//  @desc   Removes 1 user from party and updates the leader of the party.
//  @access Private
router.post("/changeleader/:id", auth, (req, res) => {
    Party.findByIdAndUpdate({_id: req.params.id}, {$pull: {users: {_id: req.body.userid}}}, {new: true}, 
        (err, party) => {
            if(err) {
                console.log(err);
                return;
            }
        User.findByIdAndUpdate({_id: req.body.userid}, {party: null})
        .then(
            Party.findByIdAndUpdate({_id: req.params.id}, {$set: {partyLeader: req.body.rsn}}, {new: true},
                (error, newParty) => {
                    if(error) {
                        console.log(error);
                        return;
                    }
                    res.json({newParty});
                })

        )

        }).catch(error => console.log(error));
    
            
})

module.exports = router;