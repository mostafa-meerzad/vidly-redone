const mongoose = require("mongoose")
const Joi = require("joi")
const {genreSchema} = require("./genre")
// instead of creating new genreSchema require the genreSchema that is already created in the genre model
// const genreSchema = mongoose.Schema("Genre", {
//     name: String,
// })

const Movie = mongoose.model("Movie",new mongoose.Schema({
    title: {type: String, required:true, minlength:5, maxlength:255},
    genre:{type: genreSchema, required: true},
    numberInStock: {type:Number, required:true, min:0, max:255},
    dailyRentalRate: {type:Number, required:true, min:1, max:255}
}))


function validate (movie){
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(50),
        genreId:Joi.string().required(),
        numberInStock: Joi.number().required().required(),
        dailyRentalRate: Joi.number().required().required(),
    })
    return schema.validate(movie)
}

module.exports = {Movie, validate}