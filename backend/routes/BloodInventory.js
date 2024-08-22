const express=require('express');
const router=express.Router();
const BloodInventory=require('../models/BloodInventory');

router.get('/',async(req,res)=>{
    const data=await BloodInventory.find();
    res.status(200).json(data);
});

router.get('/admin/:admin_id',async(req,res)=>{
    const admin_id=req.params.admin_id;
    const data=await BloodInventory.find({admin_id:admin_id});
    res.status(200).json(data); 
});

router.post('/',async(req,res)=>{
    const blood_inventory=new BloodInventory(req.body);
    await blood_inventory.save();
    res.status(201).json(blood_inventory);
});

router.patch('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodInventory.updateOne({_id:id},{$set:req.body});
    res.status(200).json(data);
});

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodInventory.deleteOne({_id:id});
    res.status(200).json(data);
});


module.exports=router;