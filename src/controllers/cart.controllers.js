import cartModel from '../dao/models/cart.model.js';

export const getProductsFromCart = async (req, res) => {
  const id = req.params.cid;
  try {
    const result = await cartModel.find({ _id: id }).populate('products.product').lean();
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
  try {
    const result = await cartModel.find();
    res.send({ status: 'success', payload: result });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const getCartByIdController = async (req, res) => {
  const result = await getProductsFromCart(req, res);
  res.status(result.statusCode).json(result.response);
};

export const createCartController = async (req, res) => {
  const cart = req.body;
  try {
    const result = await cartModel.create(cart);
    res.send({ status: 'success', payload: result });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const addProductToCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartModel.findOne({ _id: cid });
    const productIndex = cart.products.findIndex((cprod) => cprod.product == pid);

    if (productIndex === -1) {
      const product = {
        product: pid,
        quantity: 1,
      };
      cart.products.push(product);
    } else {
      let total = cart.products[productIndex].quantity;
      cart.products[productIndex].quantity = total + 1;
    }
    await cartModel.updateOne({ _id: cid }, { $set: cart });
    res.send({ status: 'sucess', payload: cart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const updateCartController = async (req, res) => {
  const cid = req.params.cid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    updatedCart.products = req.body;
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const updateProductFromCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
    if (productIndex != -1 && !isNaN(req.body.quantity)) {
      updatedCart.products[productIndex].quantity = req.body.quantity;
    }
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const deleteCartController = async (req, res) => {
  const cid = req.params.cid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    updatedCart.products = [];
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const updatedCart = await cartModel.findOne({ _id: cid });
    const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
    if (productIndex != -1) {
      updatedCart.products.splice(productIndex, 1);
    }
    await cartModel.updateOne({ _id: cid }, { $set: updatedCart });
    res.send({ status: 'sucess', payload: updatedCart.products });
  } catch (e) {
    res.status(500).send({ status: 'error', error: e.message });
  }
};
