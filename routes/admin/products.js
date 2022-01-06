// external libraries 
import express from "express";
import  { validationResult} from 'express-validator'
import multer from "multer";

// local import
import { productRepo } from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import { requireTitle, requirePrice } from "../../routes/admin/validators.js";

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()})

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], upload.single('image') ,(req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    // res.send(productNewTemplate({}));
    res.send('submitted');
});

export default router;
 