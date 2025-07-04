const express = require('express')
const auth = require("./routes/auth")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2;
const env = require("dotenv").config()
const  upload  =require("./routes/upload")
const home = require("./routes/home")
const view = require("./routes/view_product")
const cart = require("./routes/cart")
const category = require("./routes/category")
const search = require("./routes/search")


const app = express()

mongoose.connect("mongodb://localhost:27017/Ecommerce")
.then(()=>console.log("connected to MongoDB"))
.catch((err)=>console.log(err))




app.set("view engine","ejs")
app.engine('ejs', require('ejs').__express);

app.use(express.urlencoded({extended:true}))

app.use("/", auth)
app.use("/", upload)
app.use("/",home)
app.use("/",view)
app.use("/",cart)
app.use("/", category)
app.use("/",search);


app.listen(3000,()=>console.log("listening on server"))