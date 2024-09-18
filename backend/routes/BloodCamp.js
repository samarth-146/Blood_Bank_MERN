const express=require('express');
const router=express.Router();
const BloodCamp=require('../models/BloodCamp');
const {adminAuthMiddleware}=require('../middlewares');

router.get('/',async(req,res)=>{
    const data=await BloodCamp.find();
    res.status(200).json(data);
});

router.post('/', adminAuthMiddleware, async (req, res) => {
    try {
        const blood_camp = new BloodCamp({
            ...req.body,
            admin_id: req.admin._id 
        });
        await blood_camp.save();
        res.status(201).json(blood_camp);
    } catch (error) {
        console.error("Error creating blood camp:", error);
        res.status(500).json({ message: error.message });
    }
});


router.patch('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodCamp.updateOne({_id:id},{$set:req.body});
    res.status(200).json(data);
});

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodCamp.deleteOne({_id:id});
    res.status(200).json(data);
});

module.exports=router;