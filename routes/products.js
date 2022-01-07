import express from "express";
import { productRepo } from "../repositories/products.js";

const router = express.Router()

router.get("/", async (req, res) => {
    const products = await productRepo.getAll()
    res.send('All products listed here')
})

export default router;