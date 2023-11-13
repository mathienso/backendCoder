import mongoose from 'mongoose';
import productModel from './models/product.model.js';

export default class ProductDAO {
  constructor() {
    this.model = mongoose.model(productModel.productCollection, productModel.productSchema);
  }

  getAll = async (filterOptions, paginateOptions) => {
    let result = this.model.paginate(filterOptions, paginateOptions);
    return result;
  };

  save = async (product) => {
    try {
      const result = this.model.create(product);
      return { message: 'Producto agregado correctamente', payload: result };
    } catch (e) {
      return e.message;
    }
  };

  update = async (id, product) => {
    try {
      const result = await this.model.updateOne({ _id: id }, { $set: product });
      return { message: 'Producto modificado correctamente', payload: result };
    } catch (e) {
      return e.message;
    }
  };

  delete = async (id) => {
    try {
      await this.model.deleteOne({ _id: id });
      const products = await this.model.find().lean();
      return { status: 'Success', message: 'Producto borrado', payload: products };
    } catch (e) {
      return e.message;
    }
  };
}
