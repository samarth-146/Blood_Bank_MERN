const express=require('express');
const router=express.Router();
const BloodCamp=require('../models/BloodCamp');

router.get('/',async(req,res)=>{
    const data=await BloodCamp.find();
    res.status(200).json(data);
});

router.post('/',async(req,res)=>{
    const blood_camp=new BloodCamp(req.body);
    await blood_camp.save();
    res.status(201).json(blood_camp);
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