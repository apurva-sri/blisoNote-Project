const { date, required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required : true,
    },
    image: {
        url: String,
        filename: String,
    }
      
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);