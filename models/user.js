const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Adds username and password --> hashing and salting by default 
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);