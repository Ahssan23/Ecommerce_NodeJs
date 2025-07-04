const express = require("express")
const {User, Products, Cart}= require("../models/model")



category = express.Router();

category.get("/category/:category", async ( req, res)=>{
    try{ 

        let category = req.params.category;
        // res.render("category")
        categorize_products = await Products.find({category:category})
        if (categorize_products.length != 0){
            res.render("category",{ "products": categorize_products})

        }
    
        else{
            res.redirect("/")
        }
    }catch(err){
        res.redirect("/")
        console.log(err)
    }

    
})








module.exports = category;