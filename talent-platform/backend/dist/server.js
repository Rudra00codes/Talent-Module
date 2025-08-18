"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const talentRoutes_1 = __importDefault(require("./routes/talentRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS (configurable)
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// Core middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files (profile photos)
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../uploads')));
// Routes
app.use('/api/talent', talentRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Health check
app.get('/', (_req, res) => {
    res.send('Backend is running');
});
// Global error handler
app.use(errorHandler_1.errorHandler);
// Start server after DB connects
const PORT = process.env.PORT || 8080;
(0, database_1.default)()
    .then(() => {
    // Ensure upload directories exist
    const uploadDir = path_1.default.resolve(__dirname, '../uploads/profile-photos');
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to start server due to DB error:', err);
    process.exit(1);
});
