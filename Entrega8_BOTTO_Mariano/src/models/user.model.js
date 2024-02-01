import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name : String,
  email: { type:String, unique:true, required: true },
  age: Number,
  password:String,
  cart: { type: Schema.Types.ObjectId, ref: 'Carts' },
  role: { type: String, default: 'user' },
})

const userModel = model("users", userSchema)

export default userModel