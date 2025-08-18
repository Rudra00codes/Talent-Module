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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTalentNotification = exports.sendAdminNotification = void 0;
const emailServices_1 = require("./emailServices");
const whatsapp_1 = require("../config/whatsapp");
const sendAdminNotification = (talentId, notificationType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!talentId) {
            throw new Error('Talent ID is required');
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPhone = process.env.ADMIN_PHONE;
        const message = `New talent registration pending approval. ID: ${talentId}`;
        if (notificationType === 'email') {
            if (!adminEmail) {
                throw new Error('Admin email not configured');
            }
            yield (0, emailServices_1.sendEmail)({
                to: adminEmail,
                subject: 'New Talent Registration',
                message
            });
        }
        else if (notificationType === 'whatsapp') {
            if (!adminPhone) {
                throw new Error('Admin phone not configured');
            }
            yield (0, whatsapp_1.sendWhatsAppMessage)(adminPhone, message);
        }
        return true;
    }
    catch (error) {
        console.error('Failed to send admin notification:', error);
        throw error;
    }
});
exports.sendAdminNotification = sendAdminNotification;
const sendTalentNotification = (talentId, status, notificationType, contactInfo // email or phone number
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!talentId || !status || !contactInfo) {
            throw new Error('Missing required parameters');
        }
        const message = `Your profile has been ${status}. ID: ${talentId}`;
        if (notificationType === 'email') {
            yield (0, emailServices_1.sendEmail)({
                to: contactInfo,
                subject: `Profile ${status.toUpperCase()}`,
                message
            });
        }
        else if (notificationType === 'whatsapp') {
            yield (0, whatsapp_1.sendWhatsAppMessage)(contactInfo, message);
        }
        return true;
    }
    catch (error) {
        console.error('Failed to send talent notification:', error);
        throw error;
    }
});
exports.sendTalentNotification = sendTalentNotification;
