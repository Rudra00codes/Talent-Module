import axios from 'axios';

export class NotificationService {
  private static readonly API_URL = process.env.WHATSAPP_API_URL;
  private static readonly API_KEY = process.env.WHATSAPP_API_KEY;

  static async sendWhatsAppNotification(
    to: string,
    template: string,
    data: Record<string, any>
  ) {
    try {
      await axios.post(
        `${this.API_URL}/messages`,
        {
          to,
          template,
          data
        },
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`
          }
        }
      );
    } catch (error) {
      console.error('WhatsApp notification failed:', error);
      throw error;
    }
  }

  static async notifyAdminNewTalent(talent: Talent) {
    await this.sendWhatsAppNotification(
      process.env.ADMIN_PHONE_NUMBER!,
      'new_talent_registration',
      {
        talentName: talent.name,
        talentEmail: talent.email,
        approvalLink: `${process.env.ADMIN_DASHBOARD_URL}/talents/${talent.id}`
      }
    );
  }

  static async notifyAdminHireRequest(request: HireRequest, client: Client, talent: Talent) {
    await this.sendWhatsAppNotification(
      process.env.ADMIN_PHONE_NUMBER!,
      'new_hire_request',
      {
        clientName: client.name,
        talentName: talent.name,
        projectDescription: request.projectDescription,
        requestLink: `${process.env.ADMIN_DASHBOARD_URL}/requests/${request.id}`
      }
    );
  }
}