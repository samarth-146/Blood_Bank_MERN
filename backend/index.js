const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();

const blood_donation=require('./routes/blood_donation');
const admin=require('./routes/admin');
const user=require('./routes/user');
const blood_inventory=require('./routes/BloodInventory');
const blood_camp=require('./routes/BloodCamp');
const blood_request=require('./routes/BloodRequest');


const User=require('./models/User');

const mongourl=process.env.MONGO_URL;
const port=process.env.port;


async function main(){
    await mongoose.connect(mongourl);
}
main().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',user);
app.use('/blood_donation',blood_donation);
app.use('/blood_inventory',blood_inventory);
app.use('/admin',admin);
app.use('/bloodcamp',blood_camp);
app.use('/bloodrequest',blood_request)

app.get('/',async(req,res)=>{
    res.send("Data Sent");
})

app.listen(port,()=>{
    console.log(`Running on ${port}`);
});