const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: false },
})


const User = new mongoose.model('User', userSchema);

module.exports = User;