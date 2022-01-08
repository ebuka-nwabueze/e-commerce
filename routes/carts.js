import express from "express";
import {cartsRepo} from "../repositories/carts.js";
import { productRepo } from "../repositories/products.js";
import cartShowTemplate from "../views/carts/show.js";

const router = express.Router();

router.post("/cart/products", async (req, res) => {
    // req.session.cartId = null;
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log("cart.items is",cart.items)
  const existingItem = cart.items.find((item) => {
    return item.id === req.body.productId;
  });


  if (existingItem) {
    existingItem.quantity ++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send("Product added");
});


router.get("/cart", async (req,res) => {
    if(!req.session.cartId){
        return res.redirect('/')
    }
    console.log(req.session.cartId)
    const cart = await cartsRepo.getOne(req.session.cartId)
    console.log("cart is", cart)

    for(let item of cart.items){
        const product = await productRepo.getOne(item.id)

        item.product = product;
    }
    console.log("cart.items is", cart.items)
    res.send(cartShowTemplate({ items: cart.items }))
});




export default router;  

//{ items: [], id: 'c8282277' } ac3d7258
//{ items: [ {id: '62b582ba', quantity: 1 }], id: '9df807a1' }
