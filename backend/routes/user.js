const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const JWT_SECRET=process.env.JWT_SECRET;

router.get('/',async(req,res)=>{
    let data=await User.find();
    res.status(200).json(data);
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, blood_type, contact_number, address } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({ name, email, password, blood_type, contact_number, address });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        let user=await User.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User doesn't exist"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            res.status(400).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id},JWT_SECRET,{
            expiresIn:'5h',
        })
        res.json(token);
    }
    catch(error){
        console.log(error);
        res.status(500).json("Server Error");
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