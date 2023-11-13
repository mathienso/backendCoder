import ProductsService from '../services/productsService.js';
const productsService = new ProductsService();

export const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const filterOptions = {};
    if (req.query.stock) filterOptions.stock = req.query.stock;
    if (req.query.category) filterOptions.category = req.query.category;
    const paginateOptions = { lean: true, limit, page };
    if (req.query.sort === 'asc') paginateOptions.sort = { price: 1 };
    if (req.query.sort === 'desc') paginateOptions.sort = { price: -1 };
    let result = await productsService.getProducts(filterOptions, paginateOptions);
    let prevLink;
    if (!req.query.page) {
      prevLink = `http://${req.hostname}:8080${req.originalUrl}&page=${result.prevPage}`;
    } else {
      const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.prevPage}`);
      prevLink = `http://${req.hostname}:8080${modifiedUrl}`;
    }
    let nextLink;
    if (!req.query.page) {
      nextLink = `http://${req.hostname}:8080${req.originalUrl}&page=${result.nextPage}`;
    } else {
      const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.nextPage}`);
      nextLink = `http://${req.hostname}:8080${modifiedUrl}`;
    }
    return {
      statusCode: 200,
      response: {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? prevLink : null,
        nextLink: result.hasNextPage ? nextLink : null,
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      response: { status: 'error', error: e.message },
    };
  }
};

export const getProductsController = async (req, res) => {
  const result = await getProducts(req, res);
  res.status(result.statusCode).json(result.response);
};

export const addProductController = async (req, res) => {
  const product = req.body;
  let result = await productsService.addProduct(product);
  res.send(result);
};

export const updateProductController = async (req, res) => {
  const id = req.params.pid;
  const updatedProduct = req.body;
  let result = await productsService.updateProduct(id, updatedProduct);
  res.send(result);
};

export const deleteProductController = async (req, res) => {
  const id = req.params.pid;
  let result = await productsService.deleteProduct(id);
  res.send(result);
};
