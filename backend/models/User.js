const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String, 
        unique: true, 
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    blood_type: { 
        type: String,
        eunm:['A+','B+','A-','B+','O+','O-','AB+','AB-'], 
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
    blood_donation:[
        {
            type:Schema.Types.ObjectId,
            ref:"BloodDonation"
        }
    ],
    created_at:{
        type:Date,
        default:Date.now,
    },
    updated_at:{
        type:Date,
        default:Date.now,
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
const User=mongoose.model("User",userSchema);
module.exports=User;