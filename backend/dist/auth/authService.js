"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthService {
    async register(name, email, password, role, strategy) {
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passHash = await bcryptjs_1.default.hash(password, 10);
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const user = new userModel_1.default({
            name,
            email,
            passHash,
            role,
            strategy,
            isVerified: false,
            verificationToken
        });
        await user.save();
        await this.sendVerificationEmail(user.email, verificationToken);
        return user;
    }
    async sendVerificationEmail(email, token) {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            text: `Please verify your account by clicking the link: 
      http://${process.env.HOST}/auth/verify/${token}`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
    async verifyUser(token) {
        const user = await userModel_1.default.findOne({ verificationToken: token });
        if (!user) {
            throw new Error('Invalid or expired token');
        }
        user.isVerified = true;
        user.verificationToken = '';
        await user.save();
    }
    async login(email, password) {
        const user = await userModel_1.default.findOne({ email });
        if (!user || !user.isVerified) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passHash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return token;
    }
}
exports.default = new AuthService();
