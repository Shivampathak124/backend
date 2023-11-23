const mongoose = require("mongoose");



const userScehma = mongoose.Schema({
    email: String,
    password: String
    
})
const UserModel = mongoose.model("user", userScehma);

module.exports = { UserModel };
