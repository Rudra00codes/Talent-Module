"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hireRequestSchema = new mongoose_1.default.Schema({
    clientId: { type: String, required: true },
    talentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Talent', required: true },
    projectDescription: { type: String, required: true },
    budget: { type: Number },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });
exports.default = mongoose_1.default.model('HireRequest', hireRequestSchema);
