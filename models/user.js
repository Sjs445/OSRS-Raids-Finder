const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rsn:  {
    type: String,
    required: true,
    unique: false
  },
  party: {
      type: String,
      required: false
  },
  isGuide: {
    type: Boolean,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("users", UserSchema);