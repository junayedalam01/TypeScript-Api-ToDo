import mongoose from "mongoose";



const TodoScheam = new  mongoose.Schema({
 
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
    ,
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true
    }


})

const Todo = mongoose.model("TODO",TodoScheam);

export default Todo;