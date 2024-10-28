const express=require('express');
const router=express.Router();
const BloodInventory=require('../models/BloodInventory');
const {authMiddleware, adminAuthMiddleware}=require('../middlewares');

router.get('/',async(req,res)=>{
    const data=await BloodInventory.find();
    res.status(200).json(data);
});

router.get('/admin/:admin_id', async (req, res) => {
    try {
        const { admin_id } = req.params;
        const bloodInventory = await BloodInventory.findOne({ admin_id }).populate('admin_id', 'name email'); // Populate admin details if needed

        if (!bloodInventory) {
            return res.status(404).json({ message: 'No blood inventory found for this admin.' });
        }

        res.json(bloodInventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
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

router.put('/:id', adminAuthMiddleware, async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
  
    try {
      const result = await BloodInventory.updateOne({ _id: id }, { $set: req.body });
  
      // Return success response
      res.status(200).json({ message: 'Blood inventory updated successfully' });
    } catch (error) {
      console.error('Error updating blood inventory:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await BloodInventory.deleteOne({_id:id});
    res.status(200).json(data);
});


module.exports=router;