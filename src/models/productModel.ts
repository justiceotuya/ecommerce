//Require Mongoose
import {Schema, model, Document,Types} from 'mongoose';
//Define a schema


export interface IProductModel extends Document {
  productName: string,
productSku: string,
productDescription: string,
price: any,
productPicture: string,
isAvailable: boolean | string | any,
createdAt: Date,
updatedAt: Date,

merchant:String
}

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  productSku: { type: String, required: true },
  productDescription: String,
  price: { type: String, required: true },
  productPicture: String,
  isAvailable: {
    type: Boolean, required: [true, 'product availability must be set'],
    default: true },
    createdAt: Date,
  updatedAt: { type: Date, default: Date.now() },
  merchant: { type: Types.ObjectId, ref: 'Merchant', required: true }
});

// Virtual for product's URL
// ProductSchema
//   .virtual('url')
//   .get(function () {
//     return '/product/' + this._id;
//   });

export default model<IProductModel>('Product', ProductSchema);
