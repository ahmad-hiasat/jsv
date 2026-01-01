import mongoose from "mongoose";

const schema = new mongoose.Schema({
    studentGpa:{
        type:Number,
        required:true,
    },studentName:{
        type:String,
        required:true,

    },studentID:{
        type:String,
        required:true,
    },userID:{
        type:String,
        required:true,
    }
})
export default mongoose.model('Data',schema);
