const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Email is Required"],
    },
    password:{
        type:String,
        required: [true, "Password is Required"],
    },
});

module.exports = mongoose.model("Admin", adminSchema);

