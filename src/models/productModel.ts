//Require Mongoose
import {Schema, model, Document} from 'mongoose';
//Define a schema


export interface IProductModel extends Document {
  product_name: string,
product_sku: string,
product_description: string,
price: string,
product_picture: string,
product_available: boolean,
created_on: Date,
updated: Date,
}

const ProductSchema = new Schema({
  product_name: { type: String, required: true },
  product_sku: { type: String, required: true },
  product_description: String,
  price: { type: String, required: true },
  product_picture: String,
  product_available: {
    type: Boolean, required: [true, 'product availability must be set'],
    default: true },
  created_on: Date,
  updated: { type: Date, default: Date.now() }
});

// Virtual for product's URL
// ProductSchema
//   .virtual('url')
//   .get(function () {
//     return '/product/' + this._id;
//   });

export default model<IProductModel>('Product', ProductSchema);
