import mongoose from "mongoose";

let connectTo = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log('database connected')
    }catch(err){
        console.log('error while connecting to the database')
    }
}

export default connectTo 