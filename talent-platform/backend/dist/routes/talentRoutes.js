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
const fileUploadService_1 = require("../services/fileUploadService");
const notificationService_1 = require("../services/notificationService");
const router = (0, express_1.Router)();
// GET: Public directory of approved talents
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talents = yield Talent_1.default.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(talents);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch talents', details: error.message });
    }
}));
// POST: Register new talent (multipart/form-data)
router.post('/register', fileUploadService_1.upload.single('profilePhoto'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, skills, description } = req.body;
        if (!name || !email || !phone || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Profile photo is required' });
        }
        let parsedSkills = [];
        if (typeof skills === 'string') {
            try {
                const parsed = JSON.parse(skills);
                if (Array.isArray(parsed)) {
                    parsedSkills = parsed.map((s) => typeof s === 'string' ? { name: s, expertiseLevel: 'Intermediate' } : s);
                }
            }
            catch (_a) {
                return res.status(400).json({ error: 'Invalid skills format' });
            }
        }
        else if (Array.isArray(skills)) {
            parsedSkills = skills.map((s) => typeof s === 'string' ? { name: s, expertiseLevel: 'Intermediate' } : s);
        }
        if (!parsedSkills.length) {
            return res.status(400).json({ error: 'At least one skill is required' });
        }
        const talent = yield Talent_1.default.create({
            name,
            email,
            phone,
            description,
            skills: parsedSkills,
            profilePhoto: req.file.path,
            status: 'pending',
        });
        // Best-effort admin notification (optional)
        try {
            if (process.env.ADMIN_EMAIL) {
                yield (0, notificationService_1.sendAdminNotification)(String(talent._id), 'email');
            }
        }
        catch (notifyErr) {
            // log only, don't block response
            console.warn('Admin notification failed:', notifyErr);
        }
        res.status(201).json({
            message: 'Registration successful! Your profile is pending admin approval.',
            talent,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
}));
exports.default = router;
