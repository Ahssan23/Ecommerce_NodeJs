const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name: String,
    pass: String
})

const ProductsSchema = mongoose.Schema({
    title :{
        type:String,
        
    },
    desc: {
        type:String,
    
    },
    price: Number,
    category: String,
    image: String
})

const CartSchema = mongoose.Schema({
    id: String,
    user: String
})



const User = mongoose.model("Users", UserSchema, "users")
const Products = mongoose.model("Products", ProductsSchema, "products")
const Cart = mongoose.model("Cart", CartSchema, "cart")

module.exports = {User,Products, Cart}