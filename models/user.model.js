const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    username: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    minlength:[6,'Username must be atleast 6 character']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[10,'Enter a valid email '],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8,'Password must be of 8 characaters']
    }

})