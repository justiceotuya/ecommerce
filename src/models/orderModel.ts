import { IProductModel } from './productModel';
import { IUserModel } from './userModel';
//Require Mongoose
import { model, Schema, Document, Types } from 'mongoose';


export interface IOrderModel extends Document {
  created_on: Date,
  products: Array<IProductModel>,
  user: IUserModel['_id'],
  price: any,
  updated: string,
}


const OrderSchema = new Schema({
  created_on: Date,
  products: [{ type: Types.ObjectId, ref: 'Product', required: true }],
  price: String,
  user: { type: Types.ObjectId, ref: 'User', required: true },
  updated: { type: Date, default: Date.now() }
});

export default model<IOrderModel>('Order', OrderSchema);
