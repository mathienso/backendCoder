import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
      },
    ],
    default: [],
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
