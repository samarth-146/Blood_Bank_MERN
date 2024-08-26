const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');

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
    blood_inventory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Admin"
        }
    ],
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now,
    },
});

adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
    }
});

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;