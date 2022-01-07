// This is the user facing part of the product listing
import express from "express";
import { productRepo } from "../repositories/products.js";
import productIndexTemplate from "../views/products/index.js";

const router = express.Router()

router.get("/", async (req, res) => {
    const products = await productRepo.getAll()
    res.send(productIndexTemplate({products}))
})

export default router;