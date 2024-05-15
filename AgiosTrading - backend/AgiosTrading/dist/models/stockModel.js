"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const marketSchema = new mongoose_1.default.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    history: {
        type: Array,
        required: false,
    },
    indicators: {
        type: Object,
        required: false,
    },
}, {
    timestamps: true,
});
const Market = mongoose_1.default.model('Market', marketSchema);
exports.default = Market;
