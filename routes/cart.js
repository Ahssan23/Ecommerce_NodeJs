const express = require("express");
const {User,Products,Cart}= require("../models/model")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const env = require("dotenv").config()



const cart = express.Router();

cart.use(cookieparser());

cart.post("/add_cart" , async(req , res)=>{
    try{

        const token = req.cookies["access_token"]
        const id = req.body.id
        console.log(id)
        const if_already = await Cart.find({id:id})
        if (if_already.length != 0){
            res.redirect("/")

        }else{

            let decoded = jwt.verify(token,process.env.JWT_SECRET)
            const post_db = await Cart({id:id, user:decoded["username"]})
            post_db.save().then(()=>console.log("cart saved"))
            .catch((err)=>console.log(err));
            res.redirect("/")
        }
    }
    catch(err){
        res.redirect("/login")
    }
    


}
)


cart.get("/cart", async(req, res)=>{
    try{ 

        const token = req.cookies["access_token"]
        // id = req.body.id
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const get_cart = await Cart.find({user : decoded['username']})
    // console.log(get_cart.id, "thsi is syou protisdi")
    
    const productPromises = get_cart.map(async(elements)=>{
        get_products = await Products.findOne({_id:elements.id})
        return get_products
    })
    const products = await Promise.all(productPromises);
    // console.log("thisisnew",products)
    res.render("cart" , {"products": products})
 
}
    catch(err){
        res.redirect("/login")
        console.log(err)
    }

})

// delete product


cart.post("/delete" , async (req, res)=>{
    try{
        id = req.body.id;
        delete_products = await Cart.findOneAndDelete({id:id})
        console.log(delete_products)
        console.log('product deleted')
        res.redirect("/cart")
    }catch(err){
        res.redirect('/cart')
        console.log(err )

    }
})






module.exports = cart;