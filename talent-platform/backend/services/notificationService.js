const twilio = require('twilio');

class NotificationService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID, 
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendAdminNotification(payload) {
    await this.client.messages.create({
      from: 'whatsapp:+14155238886',
      body: `New ${payload.type}: ${JSON.stringify(payload.details)}`,
      to: process.env.ADMIN_WHATSAPP_NUMBER
    });
  }
}
