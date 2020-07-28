const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const partySchema = new Schema({
    raidType: {
        type: String,
        required: true
    },
    clanChat: {
        type: String,
        required: true
    },
    partyLeader: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = party = mongoose.model("party", partySchema);