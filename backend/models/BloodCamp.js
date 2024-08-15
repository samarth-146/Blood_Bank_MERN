const mongoose = require('mongoose');
const { Schema } = mongoose;

const bloodCampSchema = Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    camp_date: { 
        type: Date, 
        required: true 
    },
    contact_number: { 
        type: String, 
        required: true 
    },
    admin_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin', 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});
const BloodCamp=mongoose.model("BloodCamp",bloodCampSchema)
module.exports = BloodCamp;
