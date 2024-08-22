const mongoose=require('mongoose');
const {Schema}=mongoose;

const bloodDonationSchema=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required:true
    },
    admin_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"Admin",
        required:true,
    },
    donation_date:{
        type:Date,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
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
const BloodDonation=mongoose.model("BloodDonation",bloodDonationSchema);
module.exports=BloodDonation;