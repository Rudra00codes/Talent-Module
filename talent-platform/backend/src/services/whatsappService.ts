import { Twilio } from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

const client = new Twilio(accountSid, authToken);

interface NotificationData {
  type: 'new_talent' | 'hire_request';
  data: any;
}

class WhatsAppService {
  private static formatNewTalentMessage(data: any): string {
    return `
🆕 New Talent Registration

Name: ${data.name}
Email: ${data.email}
Skills: ${data.skills.join(', ')}

View Profile: ${process.env.FRONTEND_URL}/admin/talents/${data._id}
    `.trim();
  }

  private static formatHireRequestMessage(data: any): string {
    return `
💼 New Hire Request

Client: ${data.clientName}
Email: ${data.clientEmail}
Talent: ${data.talentName}
Project: ${data.projectDescription.substring(0, 100)}...

View Request: ${process.env.FRONTEND_URL}/admin/requests/${data._id}
    `.trim();
  }

  public static async sendNotification(notification: NotificationData): Promise<void> {
    try {
      const message = notification.type === 'new_talent' 
        ? this.formatNewTalentMessage(notification.data)
        : this.formatHireRequestMessage(notification.data);

      await client.messages.create({
        body: message,
        from: `whatsapp:${fromNumber}`,
        to: `whatsapp:${adminNumber}`
      });

      // WhatsApp notification sent successfully
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
      throw new Error('Failed to send WhatsApp notification');
    }
  }
}

export default WhatsAppService; 