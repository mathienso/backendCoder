import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.render('home', { products: products });
});

export default router;