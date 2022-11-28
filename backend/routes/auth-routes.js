const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/user')
const router = express.Router();


router.post("/register", async (req, res) => {
    const newUser = req.body;
    //check if username or email already exists
    const takenUsername = await User.findOne({username: newUser.username})
    const takenEmail = await User.findOne({email: newUser.email})

    if(takenUsername || takenEmail) {
        res.json({message: "This username or email is already taken"})
    } else {
        newUser.password = await bcrypt.hash(req.body.password, 10)
        const dbUser = new userModel ({
            username: newUser.username.toLowerCase(),
            email: newUser.email.toLowerCase(),
            password: newUser.password
        })

        dbUser.save()
        res.json({message: "Success"})
    }
})

router.post("/login", (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({email: userLoggingIn.email}).then(dbUser => {
        if(!dbUser) {
            return res.json({
                message: "Invalid username or password"
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
            if(isCorrect) {
                console.log(userLoggingIn.username);
                const payload = {
                    username: dbUser.username,
                    email: dbUser.email,
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if(err) return res.json({message: err})
                        return res.json({
                            message: "Success",
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.json({
                    message: "Invalid Username or Password"
                })
            }
        })
    })
})

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if(token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.idreq.user.username = decoded.usernamenext()
        })
    } else {
        res,json({message: "Incorrect token given", isLoggedIn: false})
    }
}

router.get("/getUsername", verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

module.exports = router;