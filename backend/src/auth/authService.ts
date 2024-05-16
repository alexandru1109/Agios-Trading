import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

class AuthService {
  public async register(name: string, email: string, password: string, role: string, strategy: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passHash,
      role,
      strategy
    });

    await user.save();
    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    return token;
  }
}

export default new AuthService();
