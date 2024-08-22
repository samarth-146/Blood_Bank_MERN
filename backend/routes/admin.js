const express=require('express');
const router=express.Router();
const Admin=require('../models/Admin');

router.get('/',async(req,res)=>{
    let data=await Admin.find();
    res.status(200).json(data);
});

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const admin=new Admin(data);
        await admin.save();
        res.status(201).json(admin);

    }catch(error){
        res.status(400).json({error:error.message});
    }
});

router.patch('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await Admin.updateOne({_id:id},{$set:req.body});
    res.status(200).json(data);
});

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await Admin.deleteOne({_id:id});
    res.status(200).json(data);
});



module.exports=router;