import fs from 'fs';

export default class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
    this.#init();
  }

  #init() {
    if (!fs.existsSync(this.#path)) {
      fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
      throw new Error('Completar todos los campos');
    }
    if (product.thumbnail == '' || product.thumbnail == null) {
      product.thumbnail = [];
    }
    if (!fs.existsSync(this.#path)) throw new Error('Archivo DB no existe');
    let data = await fs.promises.readFile(this.#path, 'utf-8');
    let products = JSON.parse(data);
    if (products.find((e) => e.code === product.code)) {
      throw new Error('El codigo ya existe');
    }
    if (isNaN(product.stock)) {
      throw new Error('El stock debe ser un número');
    }
    product.stock = parseFloat(product.stock);
    const productToAdd = { id: this.#getId(products), ...product };
    products.push(productToAdd);
    fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));

    return productToAdd;
  }

  async getProducts() {
    if (!fs.existsSync(this.#path)) throw new Error('Archivo DB no existe');
    let data = await fs.promises.readFile(this.#path, 'utf-8');
    console.log(data);
    const products = JSON.parse(data);
    return products;
  }

  async getProductById(id) {
    if (!fs.existsSync(this.#path)) throw new Error('Archivo DB no existe');
    let data = await fs.promises.readFile(this.#path, 'utf-8');
    let products = JSON.parse(data);
    let product = products.find((e) => e.id === id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  async updateProduct(id, updatedProduct) {
    if (!fs.existsSync(this.#path)) throw new Error('Archivo DB no existe');
    let isFound = false;
    let data = await fs.promises.readFile(this.#path, 'utf-8');
    let products = JSON.parse(data);
    let newProducts = products.map((e) => {
      if (e.id === id) {
        isFound = true;
        return {
          ...e,
          ...updatedProduct,
        };
      } else return e;
    });
    if (!isFound) throw new Error('Producto no encontrado');
    await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
    return newProducts.find((e) => e.id === id);
  }

  async deleteProduct(id) {
    if (!fs.existsSync(this.#path)) throw new Error('Archivo DB no existe');
    let isFound = false;
    let data = await fs.promises.readFile(this.#path, 'utf-8');
    let products = JSON.parse(data);
    let newProducts = products.filter((e) => e.id !== id);
    if (products.length !== newProducts.length) isFound = true;
    if (!isFound) throw new Error('Producto no encontrado');
    await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
    return newProducts;
  }

  #getId(products) {
    if (products.length === 0) {
      return 1; // Si no hay productos, el primer ID es 1
    } else {
      // Encontrar el ID más alto y sumarle 1 para obtener un ID único
      const highestId = Math.max(...products.map((product) => product.id));
      return highestId + 1;
    }
  }
}
