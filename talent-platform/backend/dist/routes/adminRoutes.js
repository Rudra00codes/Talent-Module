"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Talent_1 = __importDefault(require("../models/Talent"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET: Fetch pending talents (basic, unauthenticated for now)
router.get('/pending-talents', auth_1.adminApiKeyAuth, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talents = yield Talent_1.default.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(talents);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch pending talents', details: error.message });
    }
}));
// PUT: Approve talent
router.put('/approve/:id', auth_1.adminApiKeyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield Talent_1.default.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!updated)
            return res.status(404).json({ error: 'Talent not found' });
        res.json({ message: 'Talent approved successfully', talent: updated });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to approve talent', details: error.message });
    }
}));
// PUT: Reject talent
router.put('/reject/:id', auth_1.adminApiKeyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const updated = yield Talent_1.default.findByIdAndUpdate(id, { status: 'rejected', rejectionReason: reason }, { new: true });
        if (!updated)
            return res.status(404).json({ error: 'Talent not found' });
        res.json({ message: 'Talent rejected successfully', talent: updated });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to reject talent', details: error.message });
    }
}));
exports.default = router;
