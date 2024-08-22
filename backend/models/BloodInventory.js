const mongoose = require('mongoose');
const {Schema}=mongoose;

const bloodInventorySchema=Schema({
    admin_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin', 
        required: true 
    },
    blood_type:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    last_updated:{
        type:Date,
        default:Date.now,
    }
});
const BloodInventory=mongoose.model("BloodInventory",bloodInventorySchema);
module.exports=BloodInventory;
