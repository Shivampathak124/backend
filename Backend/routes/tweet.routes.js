const express = require("express");
const { tweetmodel } = require("../Model/tweetModel");




const tweetRouter = express.Router();

tweetRouter.get("/",  async (req, res) => {

    const tweets = await tweetmodel.find({});
    res.send({ tweets: tweets });
  
});


tweetRouter.post("/create", async (req, res) => {
    const { title, body, category } = req.body;
    const userId = req.userID;
    
    const tweet = await tweetmodel.create({title , body , category})
    res.send({tweets : tweets})
    
})


tweetRouter.patch("/edit/:tweetID", async (req, res) => {
    const tweetID = req.params.tweetID
    const userID = req.userID;
    const user = await tweetmodel.findOne({ _id: tweetId })
    const userEmail = user.userEmail
    const payload = req.body
    await tweetmodel.findOneAndUpdate({_id : tweetID  } , payload)
    res.send({ message: `tweet ${tweetID} updated` });

})



tweetRouter.delete("/delete/tweet/:tweetID", async (req, res) => {
    const tweetID = req.params.tweetID
    await tweetmodel.findOneAndDelete({ _id: tweetID })
    res.send({ message: "deleted successfully" });
})


module.exports = { tweetRouter };
