"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET: Fetch all talents
router.get('/', (req, res) => {
    res.json({ message: 'Fetch all talents' });
});
// POST: Register new talent
router.post('/register', (req, res) => {
    res.json({ message: 'Register new talent' });
});
exports.default = router;
