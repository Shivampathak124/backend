const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const { connection } = require("./config/db");
const { UserModel } = require("./Model/Usermodel")
const { tweetRouter} = require("./routes/tweet.routes");
const {auth } = require("./middleware/auth");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({message: "api is working"})
})


app.post("/register",  async (req, res) => {
    const { email, password } = req.body;
    const UserExit = await UserModel.findOne({ email })
    if (UserExit) {
        return res.json({message : "user already Exist "})

    }
    bcrypt.hash(password, 10, async function (err, hash) {
        await UserModel.create({ email, password: hash })
        return res.json({message : "register successfully"})
    }) 
})


app.post("/login",  async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.json({message : "user not registered please login first "})
    }
    const hashPassword = user?.password
    bcrypt.compare(password, hashPassword, function (err, result) {
        if (result) {
            const token = jwt.sign({ userId: user._id }, 'secret');
            return res.json({message:"login successfull" , token : token})
        }
        else {
            return res.json({message: "Invalid Data that you have entered"})
        }
    })
})


app.use(auth);


app.use("/tweet", tweetRouter);



app.listen(8000, async () => {
    try {
        await connection;
        console.log("connected successfully");
    } catch (error) {
        console.log(err);
    }

    console.log("listening on port 8000");
})
