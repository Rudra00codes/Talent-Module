import { sendEmail } from './emailServices';
import { sendWhatsAppMessage } from '../config/whatsapp';

interface NotificationOptions {
  to: string;
  subject?: string;
  message: string;
}

export const sendAdminNotification = async (
  talentId: string, 
  notificationType: 'email' | 'whatsapp'
): Promise<boolean> => {
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
      await sendEmail({
        to: adminEmail,
        subject: 'New Talent Registration',
        message
      });
    } else if (notificationType === 'whatsapp') {
      if (!adminPhone) {
        throw new Error('Admin phone not configured');
      }
      await sendWhatsAppMessage(adminPhone, message);
    }

    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
  }
};

export const sendTalentNotification = async (
  talentId: string,
  status: 'approved' | 'rejected',
  notificationType: 'email' | 'whatsapp',
  contactInfo: string  // email or phone number
): Promise<boolean> => {
  try {
    if (!talentId || !status || !contactInfo) {
      throw new Error('Missing required parameters');
    }

    const message = `Your profile has been ${status}. ID: ${talentId}`;
    
    if (notificationType === 'email') {
      await sendEmail({
        to: contactInfo,
        subject: `Profile ${status.toUpperCase()}`,
        message
      });
    } else if (notificationType === 'whatsapp') {
      await sendWhatsAppMessage(contactInfo, message);
    }

    return true;
  } catch (error) {
    console.error('Failed to send talent notification:', error);
    throw error;
  }
};