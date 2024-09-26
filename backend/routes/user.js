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
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact_number: req.body.contact_number,
            address: req.body.address,
            blood_type: req.body.blood_type,
        });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '5h' } 
        );

        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });

    } catch (error) {
        res.status(400).json({
            message: 'User registration failed.',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '5h',
        });

        res.json({ token, user: { id: user._id, email: user.email } }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.post('/logout',(req,res)=>{
    res.status(200).json({message:"Logged Out Successfully"});    
})


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