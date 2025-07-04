const express = require("express");
const { Users, Products } = require("../models/model");
const multer = require("multer");          
const cloudinary = require("cloudinary").v2;        
const fs = require("fs");
require("dotenv").config();
const cookieparser = require("cookie-parser");
const { console } = require("inspector");
const jwt = require("jsonwebtoken")


const uploading = multer({ dest: 'uploads/' }); 
const upload = express.Router();

upload.use(cookieparser());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,           
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary configured");

upload.get("/upload",(req,res)=>{
    try{
        const token = req.cookies['access_token']
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded['username'])
        res.render("upload")                       
    }
    catch(err){
        res.redirect("/login")
        console.log(err)
    }
})

upload.post("/upload", uploading.single("image"), (req, res) => {    
    const title = req.body.title
    const filePath = req.file.path;
    const desc = req.body.desc
    const price = req.body.price
    const category = req.body.category


    cloudinary.uploader.upload(filePath, { folder: "uploads" })        
        .then(result => {
            fs.unlinkSync(filePath); 
            res.redirect("/signup")
            console.log(result.url)
            post_db = Products({title:title,desc:desc,image:result.url, price:price, category:category})
            post_db.save().then(()=>console.log("product saved"))
            .catch((err)=>console.log(err))
        })
        .catch(err => {
            fs.unlinkSync(filePath);  
            res.status(500).json({ success: false, error: err.message });
        });
});

module.exports = upload;
