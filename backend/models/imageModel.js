import mongoose from "mongoose";

let schema = new mongoose.Schema({
    username : {
        type:String
    },
    imageUrl : {
        required : true,
        type : String
    },
    text : {
        type : String
    }
},{timestamps : true})

let imageSchema = mongoose.model('imageSchema',schema)

export default imageSchema