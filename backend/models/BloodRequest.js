const mongoose = require('mongoose');
const {Schema}=mongoose;

const bloodRequestSchema=mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
    blood_type: { 
        type: String, 
        required: true 
    },
    request_date: { 
        type: Date, 
        default: Date.now, 
        required: true 
    },
    quantity: {
         type: Number, 
         required: true,
    },
    status:{
        type:String,
        enum:['Pending','fulfilled','rejected'],
        default:'Pending'
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
const BloodRequest=mongoose.model("BloodRequest",bloodRequestSchema);
module.exports=BloodRequest;