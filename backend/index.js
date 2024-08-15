const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const User=require('./models/User');


const mongourl=process.env.MONGO_URL;
const port=process.env.port;


async function main(){
    await mongoose.connect(mongourl);
}
main().catch(err => console.log(err));


app.get('/',async(req,res)=>{
    // const user=new User({
    //     name:"XYZ",
    //     email:"xyz@gmail.com",
    //     password:"1234",
    //     blood_type:"A+",
    //     contact_number:"12345678901",
    //     address:{
    //         street_no:123,
    //         apartment_name:"Row House",
    //         city:"Nadiad",
    //         state:"Gujarat"
    //     },
    // });
    // await user.save();
    res.send("Data Sent");
})

app.listen(port,()=>{
    console.log(`Running on ${port}`);
});