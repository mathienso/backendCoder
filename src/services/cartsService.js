import CartDAO from '../dao/cartsDao.js';

export default class CartsService {
  constructor() {
    this.cartsDao;
    this.init();
  }

  init = async () => {
    this.cartsDao = new CartDAO;
  };

  getProductsFromCart = async (id) => {
    return await this.cartsDao.getProductsFromCart(id);
  };

  getCarts = async () => {
    return await this.cartsDao.getCarts();
  }

  addCart = async (cart) => {
    const result = await this.cartsDao.save(cart);
    return result;
  };

  addProductToCart = async (cid, pid) => {
    return await this.cartsDao.addProductToCart(cid, pid);
  }

  updateCart = async (id, products) => {
    return await this.cartsDao.update(id, products);
  }

  updateProductFromCart = async (cid, pid) => {
    return await this.cartsDao.updateProductsFromCart(cid, pid);
  }

  deleteCart = async (id) => {
    return await this.cartsDao.delete(id);
  }

  deleteCart = async (cid, pid) => {
    return await this.cartsDao.deleteProductFromCart(cid, pid);
  }
}
