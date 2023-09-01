import fs from 'fs';

export default class ProductManager {
    #path;
    constructor(path) {
        this.#path = path;
        this.#init();
    }

    async #init() {
        if(!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
        }
    }

    async addProduct(product) {
        if(!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
            return '[ERR] Complete all fields.';
        }
        if (product.thumbnail == "" || product.thumbnail == null ) {
            product.thumbnail = [];
        }
        if(!fs.existsSync(this.#path)) return '[ERR] DB file dont exists.';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data); 
        if(products.find(e => e.code === product.code)) {
            return '[ERR] Code already exists.';
        }
        const productToAdd = {id: this.#getId(products), ...product};
        products.push(productToAdd);
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));

        return productToAdd;
    }

    async getProducts() {
        if(!fs.existsSync(this.#path)) return '[ERR] DB file dont exists.';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        console.log(data);
        const products = JSON.parse(data);
        return products;
    }

    async getProductById(id) {
        if(!fs.existsSync(this.#path)) return '[ERR] DB file dont exists.';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data);
        let product = products.find(e => e.id === id);
        if(!product) return '[ERR] Not found.'
        return product;
    }

    async updateProduct(id, updatedProduct) {
        if(!fs.existsSync(this.#path)) return '[ERR] DB file dont exists.';
        let isFound = false;
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data);
        let newProducts = products.map(e => {
            if (e.id === id) {
                isFound = true;
                    return {
                        ...e,
                        ...updatedProduct
                    }
            } else return e;
        })
        if (!isFound) return '[ERR] Product does not exists.';
        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
        return newProducts.find(e => e.id === id);
    }

    async deleteProduct(id) {
        if(!fs.existsSync(this.#path)) return '[ERR] DB file dont exists.';
        let isFound = false;
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data);
        let newProducts = products.filter(e => e.id !== id);
        if(products.length !== newProducts.length) isFound = true;
        if(!isFound) return '[ERR] Product does not exists.';
        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
        return newProducts;
    }

    #getId(products) {
        let id = 0;
        products.length === 0 ? id = 1 : id = products.length + 1;
        return id;
    }
}