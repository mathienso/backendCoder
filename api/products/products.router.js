import { Router } from "express";
import ProductManager from "../../src/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  const limit = req.query.limit;

  if (!limit || limit > products.length) {
    return res.send({ products });
  }

  let productsLimit = [];
  for (let index = 0; index < limit; index++) {
    productsLimit.push(products[index]);
  }
  res.send({ products: productsLimit });
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  let product = await productManager.getProductById(parseInt(pid));

  if (!product) {
    return res.send({ error: "Producto no encontrado" });
  }
  res.send({ product });
});

router.post("/", async (req, res) => {
  const prod = req.body;
  await productManager.addProduct(prod);
  const products = await productManager.getProducts();
  res.send({
    status: "Success",
    payload: products,
  });
});

router.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!(await productManager.getProductById(pid))) {
    return res.send({ error: "Producto no encontrado" });
  }
  if (req.body.id) {
    return res.send({ error: "No se puede modificar el ID d eun producto" });
  }
  let updatedProduct = await productManager.updateProduct(pid, req.body);
  res.send({
    status: "Success",
    payload: updatedProduct,
  });
});

router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!(await productManager.getProductById(pid))) {
    return res.send({ error: "Producto no encontrado" });
  }
  let deletedProduct = await productManager.deleteProduct(pid);
  res.send({
    status: "Success",
    payload: deletedProduct,
  });
});

export default router;
 /* 
 try {
  const products = await productManager.getProducts();
  res.send({
    status: "Success",
    payload: products,
  });
 } catch(error) {
  res.status(500).send({})
 } */
