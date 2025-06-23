import mongoose from "mongoose";

let schema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
},{timestamps : true})

let Auth = mongoose.model('Auth',schema)

export default Auth