import mongoose, { Schema, Document } from 'mongoose';

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
  balance: { type: String, required: false }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
