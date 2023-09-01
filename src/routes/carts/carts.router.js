import { Router } from "express";
import CartManager from "../../CartsManager.js";

const router = Router();
const cartManager = new CartManager("./data/carts.json");

router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);

  let cart = await cartManager.getCartById(cid);

  if (!cart) {
    return res.send({ error: "Carrito no encontrado" });
  }
  res.send({ payload: cart.products });
});

router.post("/", async (req, res) => {
  const cart = req.body;
  await cartManager.addCart(cart);
  const carts = await cartManager.getCarts();
  res.send({
    status: "Success",
    payload: carts,
  });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  let cart = await cartManager.getCartById(cid);

  if (!cart) {
    return res.send({ error: "Carrito no encontrado" });
  }

  let updatedCart = await cartManager.addProductToCart(cid, pid);
  res.send({ payload: updatedCart });
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

export default router;
