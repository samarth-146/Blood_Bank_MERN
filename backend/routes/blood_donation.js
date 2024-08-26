const express=require('express');
const router=express.Router();
const BloodDonation=require('../models/BloodDonation');
const authMiddleware=require('../middlewares');

router.get('/',async(req,res)=>{
    try{
        let data=await BloodDonation.find();
        // console.log(data);
        res.status(200).json(data);
    }catch(e){
        console.log(e);
    }
});

router.post('/',authMiddleware,async(req,res)=>{
    try{
        let data=req.body;
        data.user_id=req.user;
        const blooddonation=new BloodDonation(data);
        await blooddonation.save();
        res.status(201).json(blooddonation);
    }
    catch(error){
        console.log(error);
        res.status(500).message({error:error.message});
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