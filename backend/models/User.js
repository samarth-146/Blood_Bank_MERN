const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String, 
        unique: true, 
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    blood_type: { 
        type: String, 
        required: true 
    },
    contact_number: { 
        type: String, 
        required: true 
    },
    address:{
        street_no:{
            type:Number,
            required:true,
        },
        apartment_name:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        }
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    updated_at:{
        type:Date,
        default:Date.now,
    }
});

const User=mongoose.model("User",userSchema);
module.exports=User;