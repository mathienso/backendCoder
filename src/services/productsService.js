import ProductDAO from '../dao/productsDao.js';

export default class ProductsService {
  constructor() {
    this.productsDao;
    this.init();
  }

  init = async () => {
    this.productsDao = new ProductDAO;
  };

  getProducts = async (filterOptions, paginateOptions) => {
    return await this.productsDao.getAll(filterOptions, paginateOptions);
  };

  addProduct = async (product) => {
    return await this.productsDao.save(product);
  };

  updateProduct = async (id, product) => {
    return await this.productsDao.update(id, product);
  }

  deleteProduct = async (id) => {
    return await this.productsDao.delete(id);
  }
}
