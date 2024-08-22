const mongoose=require('mongoose');
const {Schema}=mongoose;

const adminSchema=new Schema({
    institution_name:{
        type:String,
        required:true,
    },
    location:{
        street_no:{
            type:Number,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true,
        }
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact_number:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now,
    },
});

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;