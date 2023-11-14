import mongoose from 'mongoose';
import cartModel from './models/cart.model.js';

export default class CartDAO {
  constructor() {
    this.model = mongoose.model(cartModel.cartCollection, cartModel.cartSchema);
  }

  getProductsFromCart = async (id) => {
    let result = await this.model.findById({ _id: id }).populate('products.product').lean().exec();
    return result;
  };

  getCarts = async () => {
    try {
      const result = await this.model.find();
      return { status: 'success', payload: result };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  save = async (cart) => {
    try {
      const result = await this.model.create(cart);
      return { status: 'success', payload: result };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      const cart = await this.model.findOne({ _id: cid });
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
      await this.model.updateOne({ _id: cid }, { $set: cart });
      return { status: 'sucess', payload: cart.products };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  update = async (id, products) => {
    try {
      const updatedCart = await this.model.findOne({ _id: id });
      updatedCart.products = products;
      await this.model.updateOne({ _id: id }, { $set: updatedCart });
      return { status: 'sucess', payload: updatedCart.products };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  updateProductsFromCart = async (cid, pid, body) => {
    try {
      const updatedCart = await this.model.findOne({ _id: cid });
      const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
      if (productIndex != -1 && !isNaN(body.quantity)) {
        updatedCart.products[productIndex].quantity = body.quantity;
      }
      await this.model.updateOne({ _id: cid }, { $set: updatedCart });
      return { status: 'sucess', payload: updatedCart.products };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  delete = async (id) => {
    try {
      const updatedCart = await this.model.findOne({ _id: id });
      updatedCart.products = [];
      await this.model.updateOne({ _id: id }, { $set: updatedCart });
      return { status: 'sucess', payload: updatedCart.products };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      const updatedCart = await this.model.findOne({ _id: cid });
      const productIndex = updatedCart.products.findIndex((cprod) => cprod.product == pid);
      if (productIndex != -1) {
        updatedCart.products.splice(productIndex, 1);
      }
      await this.model.updateOne({ _id: cid }, { $set: updatedCart });
      return { status: 'sucess', payload: updatedCart.products };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  };
}
