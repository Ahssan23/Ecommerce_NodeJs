const express = require("express")
const {User,Products}= require("../models/model")


const view = express.Router()


view.post("/view" , async (req,res )=>{
    try {

        id = req.body.id;
        get_products = await Products.find({_id:id})
        console.log(get_products)
        
        res.render("view", {"get_products": get_products})
    }catch(err){
        console.log(err)
        res.redirect("/")
    }

})




module.exports = view