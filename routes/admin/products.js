// external libraries
import express from "express";
import { validationResult } from "express-validator";
import multer from "multer";


// local import
import { handleErrors } from './middlewares.js'
import { productRepo } from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import { requireTitle, requirePrice } from "../../routes/admin/validators.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");
    const newProduct = await productRepo.create({ title, price, image });
    //
    console.log(newProduct);
    res.send("submitted");
  }
);

export default router;
 