const mongoose = require("mongoose");


const tweetSchema = mongoose.Schema({
    title: String,
    body: String,
    category: String,

})


const tweetmodel = mongoose.model("tweet", tweetSchema);

module.exports = { tweetmodel };
