import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

export class AuthService {
  // Funcția pentru înregistrarea unui nou utilizator
  static async register(username: string, email: string, password: string): Promise<IUser> {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new User({
        name: username,  
        email: email,
        passHash: hashedPassword, 
        role: 'defaultRole',       
        strategy: 'local'       
      });

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Funcția pentru autentificarea unui utilizator
  static async login(email: string, password: string): Promise<string> {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = bcrypt.compareSync(password, user.passHash);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      const payload = {
        userId: user._id,
        email: user.email
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' });
      return token;
    } catch (error) {
      throw error;
    }
  }
  
}
