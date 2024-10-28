const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const BloodDonation=require('../models/BloodDonation');
const { authMiddleware, adminAuthMiddleware } = require('../middlewares');

const JWT_SECRET=process.env.JWT_SECRET;


router.get('/', async (req, res) => {
    let data = await Admin.find();
    res.status(200).json(data);
});

router.post('/register', async (req, res) => {
    try {
        const { institution_name, email, password, contact_number, location } = req.body;

        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        admin = new Admin({ institution_name, email, password, contact_number, location });
        await admin.save();

        const token = jwt.sign(
            { adminId: admin._id },  
            process.env.JWT_SECRET,
            { expiresIn: '5h' } 
        );
        res.status(201).json({
            message: 'Admin registered successfully!',
            token,
            admin: {
                id: admin._id,
                institution_name: admin.institution_name,
                email: admin.email,
                contact_number: admin.contact_number,
                location: admin.location,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/login', async (req, res) => {
    try{
        const {email,password}=req.body;
        let admin=await Admin.findOne({email:email});
        if(!admin){
            res.status(400).json({message:"User doesn't exist"});
        }
        const match=await bcrypt.compare(password,admin.password);
        if(!match){
            res.status(401).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({id:admin._id},JWT_SECRET,{
            expiresIn:'5h',
        })
        res.json(token);
    }
    catch(error){
        console.log(error);
        res.status(500).json("Server Error");
    }
});

router.post('/logout',(req,res)=>{

    res.status(200).json({message:"Logged Out Successfully"});    
});


router.get('/donors',adminAuthMiddleware, async (req, res) => {
    try {
        const adminId = req.admin.id;
        const donations = await BloodDonation.find({ admin_id: adminId })
            .populate('user_id', 'name contact_number blood_type') 
            .select('user_id donation_date'); 

        console.log(donations);

        // Extract and format the donor data
        const donors = donations.map(donation => ({
            name: donation.user_id.name,
            contactNumber: donation.user_id.contact_number,
            bloodType: donation.user_id.blood_type,
            donationDate: donation.donation_date,
        }));

        res.status(200).json(donors);
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: 'Server error, unable to fetch donors' });
    }
});

module.exports = router;


router.get('/:admin_id', async (req, res) => {
    const { admin_id } = req.params;
    try {
      const admin = await Admin.findById(admin_id); // Fetch admin from the database
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.json(admin); // Return the admin data
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admin details' });
    }
  });
  

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Admin.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json(data);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Admin.deleteOne({ _id: id });
    res.status(200).json(data);
});



module.exports = router;