const express = require("express");
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

    // console.log(user.name)

    await user.save()

    // res.send(user) // the response object contains data that you shouldn't share or send back to the user as a response
    // two solutions
    // res.send({name: user.name, email: user.email}) // pick manually
    res.send(_.pick(user, ["name", "email"])) // use lodash
} )


module.exports = router;