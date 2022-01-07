import express from "express";
import { cartsRepo } from "../repositories/carts.js";

const router = express.Router()

router.post("/cart/products", async (req,res)=>{
    
    let cart;
    if(!req.session.cardId){
        cart = await cartsRepo.create({ items:[] })
        req.session.cartId = cart.id
    } else {
        cart = await cartsRepo.getOne(req.session.cartId)
    }

    console.log(cart)
    res.send("Product added")
});

export default router;