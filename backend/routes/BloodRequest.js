const express=require('express');
const router=express.Router();
const BloodRequest=require('../models/BloodRequest');

router.get('/',async(req,res)=>{
    const data=await BloodRequest.find();
    res.status(200).json(data);
});

router.post('/',async(req,res)=>{
    const blood_req=new BloodRequest(req.body);
    await blood_req.save();
    res.status(201).json(blood_req);
});

router.patch('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodRequest.updateOne({_id:id},{$set:req.body});
    res.status(200).json(data);
});

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodRequest.deleteOne({_id:id});
    res.status(200).json(data);
});

module.exports=router;