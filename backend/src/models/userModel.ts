import { number } from 'joi';
import { IntegerType } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';
import internal from 'stream';

export interface IUser extends Document {
  name: string;
  email: string;
  passHash: string;
  role: string;
  strategy: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passHash: { type: String, required: true },
  role: { type: String, required: true },
  strategy: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
