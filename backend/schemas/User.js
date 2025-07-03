const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { 
   type: String,
  unique: true,
  required: true,
  },
  email: { type: String, unique: true },
  password: String,
});




module.exports = mongoose.model("User", UserSchema);


