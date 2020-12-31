import { IStoreModel } from './storeModel';
import { IUserModel } from './userModel';

//Require Mongoose
import {model, Schema, Document,Types} from 'mongoose';

//Define a schema


export interface IDispatchRiderModel extends Document {
  details:IUserModel['_id'],
  storesServiced:Array<IStoreModel>,
createdAt:Date,
updated:Date,
}

const StoreSchema = new Schema({
  details:  { type: Types.ObjectId, ref: 'User', required: true },
  storesServiced: [{ type: Types.ObjectId, ref: 'Store', required: true }], //the stores that the dispatch rider is currently attached to. they can be attached to multiple stores
  updated: { type: Date, default: Date.now() },
  createdAt: Date,
});


export default model<IDispatchRiderModel>('DispatchRider', StoreSchema);
