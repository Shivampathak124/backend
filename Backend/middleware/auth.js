const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.json({ message: "please login" });
        

    }

    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            return res.json({ message: "invalid token" });
        }

        const userId = decoded.userId
        req.userId = userId
        next()
    });
}


module.exports = {auth};
