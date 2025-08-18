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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const talentRoutes_1 = __importDefault(require("./routes/talentRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials if needed
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/talent', talentRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// MongoDB connection
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Define the Talent Schema
const talentSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    skills: [String],
    status: { type: String, default: 'pending' }
});
const Talent = mongoose_1.default.model('Talent', talentSchema);
// Define the /api/talents route
app.get('/api/talents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talents = yield Talent.find();
        res.json(talents);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching talents' });
    }
}));
// Define the /api/talents/register route
app.post('/api/talents/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, skills } = req.body;
    const newTalent = new Talent({ name, email, skills });
    try {
        yield newTalent.save();
        res.status(201).json(newTalent);
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving talent', error });
    }
}));
// Root route
app.get('/', (req, res) => {
    res.send('Backend is running');
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
