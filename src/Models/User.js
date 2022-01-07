const mongoose = require('mongoose');


//  username hash(password) email mandatory for every user 
//  created_at and updated_at is set to default & updated_at will be updated on every updation


const UserSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true
    } , 
    hash : {
        type : String , 
        required : true
    } , 
    email : {
        type : String , 
        required : true
    } , 
    email_verified : {
        type : Boolean , 
        default : false
    } , 
    created_at : {
        type : String , 
        default : Date.now
    } , 
    updated_at : {
        type : String , 
        default : Date.now
    }
});


const User = mongoose.model('user' , UserSchema);


module.exports = User;