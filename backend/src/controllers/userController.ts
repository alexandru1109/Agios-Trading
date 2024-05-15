import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = (req.user as jwt.JwtPayload).id; 
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.passHash = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
