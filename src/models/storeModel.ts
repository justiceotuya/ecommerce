import { IDispatchRiderModel } from './dispatchRiderModel';
//Require Mongoose
import {model, Schema, Document,Types} from 'mongoose';
import { IUserModel } from './userModel';

//Define a schema


export interface IStoreModel extends Document {
storeEmail:string,
storePhoneNumber:string,
createdAt:Date,
updated:Date,
storeName: string;
storeOwner: IUserModel['_id'];
storeLocation: string;
dispatchRider: IDispatchRiderModel['_id'];
}

const StoreSchema = new Schema({
  // orders : [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
  storeName: { type: String, required: true},
  storeEmail: String,
  storePhoneNumber: String,
  storeOwner:  { type: Types.ObjectId, ref: 'User', required: true },
  storeLocation: String,
  updated: { type: Date, default: Date.now() },
  createdAt: Date,
  dispatchRider:{ type: Types.ObjectId, ref: 'DispatchRider', required: true },
});


export default model<IStoreModel>('Store', StoreSchema);
