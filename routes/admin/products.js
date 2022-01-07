// external libraries
import express from "express";
import multer from "multer";
// local import
import { handleErrors, requireAuth } from "./middlewares.js";
import { productRepo } from "../../repositories/products.js";
import productNewTemplate from "../../views/admin/products/new.js";
import productIndexTemplate from "../../views/admin/products/index.js";
import productEditTemplate from "../../views/admin/products/edit.js";
import { requireTitle, requirePrice } from "../../routes/admin/validators.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await productRepo.getAll();
  res.send(productIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");
    const newProduct = await productRepo.create({ title, price, image });
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const product = await productRepo.getOne(req.params.id);

  if (!product) {
    return res.send("product not found");
  }

  res.send(productEditTemplate({ product }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productEditTemplate, async (req) => {
    const product = await productRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }

    try {
      await productRepo.update(req.params.id, changes);
    } catch (error) {
      return res.send("Product not found");
    }

    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await productRepo.delete(req.params.id);
  res.redirect("/admin/products/");
});

export default router;
