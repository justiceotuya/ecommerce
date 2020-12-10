//Require Mongoose
import {model, Schema, Document, Types} from 'mongoose';


export interface IOrderModel extends Document {
  order_date:Date,
products:[string],
user:string,
order_picture:string,
}


const OrderSchema = new Schema({
  order_date: Date,
  products: [{ type: Types.ObjectId, ref: 'Product', required: true }],
  user: { type: Types.ObjectId, ref: 'User', required: true },
  order_picture: String,
});

export default model<IOrderModel>('Order', OrderSchema);
