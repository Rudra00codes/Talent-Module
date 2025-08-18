"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET: Fetch pending talents
router.get('/pending-talents', (req, res) => {
    res.json({ message: 'Fetch pending talents' });
});
// PUT: Approve talent
router.put('/approve/:id', (req, res) => {
    res.json({ message: 'Approve talent' });
});
exports.default = router;
