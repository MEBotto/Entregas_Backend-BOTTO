import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true, default: 1 },
  }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
})

const cartModel = model("carts", cartSchema)

export { cartModel }