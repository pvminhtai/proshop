const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        quanity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Cart', cartSchema);
