//Require Mongoose
import {model, Schema, Document} from 'mongoose';

//Define a schema


export interface IUserModel extends Document {
  firstName:string,
lastName:string,
email:string,
phoneNumber:string,
password:string,
date_registered:Date,
updated:Date,
}

const UserSchema = new Schema({
  // orders : [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
  firstName: { type: String, required: [true, 'user must have a first name'], trim: true },
  lastName: { type: String, required: [true, 'user must have a last name'], trim: true },
  email: { type: String, required: [true, 'user must have an email'], trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  password: { type: String, required: [true, 'user must have a password'], trim: true },
  date_registered: Date,
  updated: { type: Date, default: Date.now() }
});


export default model<IUserModel>('User', UserSchema);
