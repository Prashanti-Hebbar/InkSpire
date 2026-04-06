const mongoose  = require('mongoose');
const userschema  = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    phone:{type:Number},
    address:{type:String}
})

module.exports = mongoose.model('User',userschema)

// User -> Table name or collection name