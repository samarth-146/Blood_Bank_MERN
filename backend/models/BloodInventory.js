const mongoose = require('mongoose');
const {Schema}=mongoose;

const bloodInventorySchema=Schema({
    admin_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin', 
        required: true 
    },
    blood_inventory:[{
        blood_type:{
            type:String,
            eunm:['A+','B+','A-','B+','O+','O-','AB+','AB-','B-'],
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        expiration_date:{
            type:Date,
            required:true
        }
    }],
    last_updated:{
        type:Date,
        default:Date.now,
    }
});
const BloodInventory=mongoose.model("BloodInventory",bloodInventorySchema);
module.exports=BloodInventory;
