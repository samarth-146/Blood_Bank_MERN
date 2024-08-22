const express=require('express');
const router=express.Router();
const User=require('../models/User');

router.get('/',async(req,res)=>{
    let data=await User.find();
    res.status(200).json(data);
});

router.post('/',async(req,res)=>{
    try{
        let data=req.body;
        let user=new User(data);
        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        console.log("Hello");
    }
});

router.get('/:user_id',async(req,res)=>{
    let user_id=req.params.user_id;
    console.log(user_id);
    let data=await User.findById(user_id);
    res.status(200).json(data);
});

router.patch('/:user_id',async(req,res)=>{
    try{
        const user_id=req.params.user_id;
        console.log(req.body);
        const data=await User.updateMany({_id:user_id},{$set:req.body});
        res.json({message:"Updated Successfully",data});    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.delete('/:user_id',async(req,res)=>{
    try{
        const user_id=req.params.body;
        const deletedData=await User.deleteOne({user_id:user_id});
        res.json({message:"Deleted Successfully",deletedData});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
module.exports=router;