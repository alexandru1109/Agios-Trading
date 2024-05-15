"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = async (userData) => {
    const newUser = new userModel_1.default(userData);
    return await newUser.save();
};
exports.createUser = createUser;
const getAllUsers = async () => {
    return await userModel_1.default.find();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await userModel_1.default.findById(id);
};
exports.getUserById = getUserById;
const updateUser = async (id, userData) => {
    return await userModel_1.default.findByIdAndUpdate(id, userData, { new: true });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await userModel_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
