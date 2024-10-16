const express=require('express');
const router=express.Router();
const BloodInventory=require('../models/BloodInventory');
const {authMiddleware}=require('../middlewares');

router.get('/',async(req,res)=>{
    const data=await BloodInventory.find();
    res.status(200).json(data);
});

router.get('/admin/:admin_id',async(req,res)=>{
    const admin_id=req.params.admin_id;
    const data=await BloodInventory.find({admin_id:admin_id});
    res.status(200).json(data); 
});

router.post('/',authMiddleware,async(req,res)=>{
    try{
        const {adminId,stockEntries}=req.body;
        console.log(stockEntries);
        let bloodInventory = await BloodInventory.findOne({ admin_id: adminId });
        if (bloodInventory) {
            stockEntries.forEach(entry => {
                const existingEntry = bloodInventory.blood_inventory.find(b => 
                    b.blood_type === entry.bloodType && b.expiration_date === entry.expirationDate
                );
                if (existingEntry) {
                    existingEntry.quantity += parseInt(entry.quantity);
                } else {
                    bloodInventory.blood_inventory.push({ 
                        blood_type: entry.bloodType, 
                        quantity: parseInt(entry.quantity), 
                        expiration_date: entry.expirationDate 
                    });
                }
            });
            bloodInventory.last_updated = Date.now();
        }
        else{
            bloodInventory = new BloodInventory({
                admin_id:adminId,
                blood_inventory: stockEntries.map(entry => ({
                    blood_type: entry.bloodType,
                    quantity: entry.quantity,
                    expiration_date:entry.expirationDate,
                })),
                last_updated: Date.now()
            });
        }
        await bloodInventory.save();
        res.status(201).json({ message: 'Blood stock updated successfully' });
    
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:error.message});
    }
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