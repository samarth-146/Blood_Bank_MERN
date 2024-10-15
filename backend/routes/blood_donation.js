const express=require('express');
const router=express.Router();
const BloodDonation=require('../models/BloodDonation');
const {authMiddleware}=require('../middlewares');
const User=require('../models/User');
const Admin=require('../models/Admin');

router.get('/',async(req,res)=>{
    try{
        let data=await BloodDonation.find();
        res.status(200).json(data);
    }catch(e){
        console.log(e);
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.body);
        const { adminId, userId, donationDate } = req.body;

        // Find the admin by ID
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        const bloodDonationData = {
            user_id: userId,         
            admin_id: admin._id,     
            donation_date: donationDate,
        };

        const bloodDonation = new BloodDonation(bloodDonationData);
        await bloodDonation.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { blood_donation: bloodDonation._id } }, 
            { new: true }
        );

        res.status(201).json(bloodDonation);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/user/:user_id', async (req, res) => {
    try {
        const donations = await BloodDonation.find({ user_id: req.params.user_id });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admin/:admin_id',async(req,res)=>{
    try {
        const donations = await BloodDonation.find({ admin_id: req.params.admin_id });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/user/:user_id',async(req,res)=>{
    try{
        const updateDonation=await BloodDonation.updateMany({user_id:req.params.user_id},{$set:req.body});
        res.json({message:"Updated Successfully",updateDonation});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

router.delete('/user/:user_id',async(req,res)=>{
    try{
        const deleteDonation=await BloodDonation.deleteMany({user_id:req.params.user_id});
        res.json({message:"Deleted Successfully",deleteDonation});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

module.exports=router;