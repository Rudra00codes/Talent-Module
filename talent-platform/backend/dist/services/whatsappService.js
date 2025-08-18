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
const twilio_1 = require("twilio");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;
const client = new twilio_1.Twilio(accountSid, authToken);
class WhatsAppService {
    static formatNewTalentMessage(data) {
        return `
🆕 New Talent Registration

Name: ${data.name}
Email: ${data.email}
Skills: ${data.skills.join(', ')}

View Profile: ${process.env.FRONTEND_URL}/admin/talents/${data._id}
    `.trim();
    }
    static formatHireRequestMessage(data) {
        return `
💼 New Hire Request

Client: ${data.clientName}
Email: ${data.clientEmail}
Talent: ${data.talentName}
Project: ${data.projectDescription.substring(0, 100)}...

View Request: ${process.env.FRONTEND_URL}/admin/requests/${data._id}
    `.trim();
    }
    static sendNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = notification.type === 'new_talent'
                    ? this.formatNewTalentMessage(notification.data)
                    : this.formatHireRequestMessage(notification.data);
                yield client.messages.create({
                    body: message,
                    from: `whatsapp:${fromNumber}`,
                    to: `whatsapp:${adminNumber}`
                });
                console.log('WhatsApp notification sent successfully');
            }
            catch (error) {
                console.error('Error sending WhatsApp notification:', error);
                throw new Error('Failed to send WhatsApp notification');
            }
        });
    }
}
exports.default = WhatsAppService;
