const Joi = require("joi")
const mongoose = require("mongoose")

const Rental = new mongoose.model("Rental", new mongoose.Schema({

    customer:{
        type: new mongoose.Schema({
            name: {type: String, required:true, minlength:5, maxlength:50},
            isGold:{type: Boolean, default:false},
            phone:{type: String, required:true, minlength:5, maxlength:50},
        }), 
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title:{type: String, required:true, minlength:5, maxlength: 50},
            dailyRentalRate:{type: String, required:true, min: 0, max:255}
        }),
        required: true
    },
    dateOut:{
        type:Date,
        required:true,
        default: Date.now()
    } ,
    DateReturned:{
        type:Date
    },
    rentalRate:{
        type: Number,
        min: 0
    }
}))

function validate(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    })
    return schema.validate(rental)
}

module.exports = {Rental, validate}