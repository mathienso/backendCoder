import fs from "fs";

export default class CartManager {
  #path;
  constructor(path) {
    this.#path = path;
    this.#init();
  }

  async #init() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
  }

  async addCart() {
    if (!fs.existsSync(this.#path)) return "[ERR] DB file dont exists.";

    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    const cartToAdd = { id: this.#getId(carts), products: [] };
    carts.push(cartToAdd);
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));

    return cartToAdd;
  }

  async getCarts() {
    if (!fs.existsSync(this.#path)) return "[ERR] DB file dont exists.";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    const carts = JSON.parse(data);
    return carts;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    let cart = carts.find((e) => e.id === id);
    if (!cart) return "[ERR] Not found.";
    return cart;
  }

  async addProductToCart(cartId, productId) {
    if (!fs.existsSync(this.#path)) return "[ERR] DB file dont exists.";
    let isFoundCart = false;
    let isFoundProduct = false;
    let newProducts;
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    let newCarts = carts.map((e) => {
      if (e.id === cartId) {
        isFoundCart = true;

        newProducts = e.products.map((p) => {
          if (p.product === productId) {
            isFoundProduct = true;
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        });
        
        if (!isFoundProduct) {
          e.products.push({
            product: productId,
            quantity: 1,
          });
          return e;
        }

        console.log(e);
        console.log(newProducts);
        return {
          ...e,
          products: newProducts,
        };
      } else return e;
    });
    if (!isFoundCart) return "[ERR] Cart does not exists.";
    await fs.promises.writeFile(this.#path, JSON.stringify(newCarts, null, 2));
    return newCarts;
  }

  #getId(carts) {
    let id = 0;
    carts.length === 0 ? (id = 1) : (id = carts.length + 1);
    return id;
  }
}
