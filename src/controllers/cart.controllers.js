import CartsService from '../services/cartsService.js';
const cartsService = new CartsService();

export const getProductsFromCart = async (req, res) => {
  const id = req.params.cid;
  try {
    //const result = await cartModel.find({ _id: id }).populate('products.product').lean();
    const result = cartsService.getProductsFromCart(id);
    return {
      statusCode: 200,
      response: { status: 'success', payload: result },
    };
  } catch (e) {
    return {
      statusCode: 500,
      response: { status: 'error', error: e.message },
    };
  }
};

export const getCartsController = async (req, res) => {
  const result = await cartsService.getCarts();
  res.send(result);
};

export const getCartByIdController = async (req, res) => {
  const result = await getProductsFromCart(req, res);
  res.status(result.statusCode).json(result.response);
};

export const createCartController = async (req, res) => {
  const cart = req.body;
  const result = cartsService.addCart(cart);
  res.send(result);
};

export const addProductToCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = cartsService.addProductToCart(cid, pid);
  res.send(result);
};

export const updateCartController = async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  const result = await cartsService.updateCart(cid, products);
  res.send(result)
};

export const updateProductFromCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await cartsService.updateProductFromCart(cid, pid);
  res.send(result);
};

export const deleteCartController = async (req, res) => {
  const id = req.params.cid;
  const result = await cartsService.deleteCart(id);
  res.send(result);
};

export const deleteProductFromCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await cartsService.deleteProductFromCart(cid, pid);
  res.send(result);
};
