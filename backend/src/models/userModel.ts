import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passHash: string;
  role: string;
  strategy: string;
  isVerified: boolean;
  verificationToken: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passHash: { type: String, required: true },
  role: { type: String, required: true },
  strategy: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
