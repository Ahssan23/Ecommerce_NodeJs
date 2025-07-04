const express = require("express")
const {Users, Products, Cart}= require("../models/model")



const search = express.Router();

search.get("/search/:search" ,async (req ,res)=>{
    title = req.params.search;
    get_products = await Products.find({title:title})

    res.render("home", {"get_products":get_products})
    console.log(get_products)
    
})


module.exports = search;