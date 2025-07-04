const express = require("express")
const {User,Products,Cart} = require("../models/model")
const env = require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const auth = express.Router()


auth.get("/signup", (req, res)=>{
        const if_user_already =false;
        res.render("signup",{"username_already_exists":if_user_already})
})

auth.post("/signup",async (req,res)=>{
    user = req.body.username
    pass = req.body.password

    already_exists = false;

    if_user_already= await User.find({name:user})
    console.log(if_user_already)    
    if (if_user_already.length != 0){

        console.log("username already exists")
        already_exists= true
        res.render("signup",{"username_already_exists":if_user_already})
    }
    else{
        bcrypt.hash(pass, 10, async (err,hash)=>{
            if(err)console.log(err)

            post_db= await User({name:user ,pass:hash})
            post_db.save().then(()=>console.log("Creds Saved")
        ).catch((err)=>console.log(err))
            
        res.redirect("/signup")
            
        })

    }

})


auth.get("/login", (req,res)=>{
    res.render("login")
})


    auth.post("/login",async(req,res)=>{
        user = req.body.username
        pass = req.body.pass
        get_creds = await User.find({name:user})
        if (get_creds.length != 0 ){
            bcrypt.compare(pass, get_creds[0].pass, (err, hash)=>{
                if(hash){
                    console.log("password matched")
                    data ={
                        "username" : user
                    }
                    const token = jwt.sign(data , process.env.JWT_SECRET, {expiresIn: "10min"});

                    res.cookie("access_token", token)
                    return res.redirect("/signup")
                }
                if(err){
                    console.log(err)
                    res.redirect("/login")


                }
                else{
                    console.log("wronng password")
                    res.redirect("/login")
                }
            })
        }
        else{
            console.log("opps your files has been encrypted")
            res.redirect("/login")
        }
    })



module.exports = auth;