const express = require("express");
const bcrypt = require("bcrypt");
const {User, validate} = require("../models/user")
const router = express.Router();
const _ = require("lodash")
router.post("/", async (req, res) =>{

    // todo
    // check the user input
    // check for the existence of the given user
    // create the new user

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send("user already registered")

    // use lodash to make things easier
    // user = new User({
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password,
    // })
     user = new User(_.pick(req.body, ["name", "email", "password"]))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    // console.log(user.name)

    await user.save()

    // res.send(user) // the response object contains data that you shouldn't share or send back to the user as a response
    // two solutions
    // res.send({name: user.name, email: user.email}) // pick manually
    // res.send(_.pick(user, ["name", "email"])) // use lodash

    // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    // now that we have the user-token generated we need to send it to the client so they can use it to request the server in the future
  
    res.header("x-user-token",user.generateAuthToken()).send(_.pick(user, ["name", "email"])) // every custom-header should be prefixed by 'x-'
    
} )


module.exports = router;