"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const userModel_1 = __importDefault(require("../models/userModel"));
jest.mock('../models/userModel'); // Ensure the path is correct
describe('User Service', () => {
    const mockUser = {
        _id: '1',
        name: 'testuser',
        email: 'test@example.com',
        passHash: 'hashedpassword',
        role: 'user',
        strategy: 'strategy1',
    };
    describe('createUser', () => {
        it('should create a new user', async () => {
            userModel_1.default.prototype.save.mockResolvedValue(mockUser);
            const newUser = await (0, userService_1.createUser)(mockUser);
            expect(newUser).toEqual(mockUser);
        });
    });
    describe('getAllUsers', () => {
        it('should fetch all users', async () => {
            userModel_1.default.find.mockResolvedValue([mockUser]);
            const users = await (0, userService_1.getAllUsers)();
            expect(users).toEqual([mockUser]);
        });
    });
    describe('getUserById', () => {
        it('should fetch a user by id', async () => {
            userModel_1.default.findById.mockResolvedValue(mockUser);
            const user = await (0, userService_1.getUserById)('1');
            expect(user).toEqual(mockUser);
        });
        it('should return null if user not found', async () => {
            userModel_1.default.findById.mockResolvedValue(null);
            const user = await (0, userService_1.getUserById)('1');
            expect(user).toBeNull();
        });
    });
    describe('updateUser', () => {
        it('should update a user', async () => {
            const updatedUser = Object.assign(Object.assign({}, mockUser), { name: 'updatedUser' });
            userModel_1.default.findByIdAndUpdate.mockResolvedValue(updatedUser);
            const user = await (0, userService_1.updateUser)('1', { name: 'updatedUser' });
            expect(user).toEqual(updatedUser);
        });
        it('should return null if user not found', async () => {
            userModel_1.default.findByIdAndUpdate.mockResolvedValue(null);
            const user = await (0, userService_1.updateUser)('1', { name: 'updatedUser' });
            expect(user).toBeNull();
        });
    });
    describe('deleteUser', () => {
        it('should delete a user', async () => {
            userModel_1.default.findByIdAndDelete.mockResolvedValue(mockUser);
            const user = await (0, userService_1.deleteUser)('1');
            expect(user).toEqual(mockUser);
        });
        it('should return null if user not found', async () => {
            userModel_1.default.findByIdAndDelete.mockResolvedValue(null);
            const user = await (0, userService_1.deleteUser)('1');
            expect(user).toBeNull();
        });
    });
});
