const express = require("express")
const {User,Products}= require("../models/model")


const home = express.Router()

    
home.get("/", async (req,res)=>{
    let get_products = await Products.find()

    res.render("home", {"get_products": get_products})

})


module.exports =home;