const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendAdminNotification({ type, talent }) {
    const adminEmail = process.env.ADMIN_EMAIL;

    const emailTemplates = {
      NEW_TALENT_REGISTRATION: {
        subject: 'New Talent Registration - Action Required',
        html: `
          <h2>New Talent Registration</h2>
          <p>A new talent has registered and requires your review:</p>
          <ul>
            <li>Name: ${talent.name}</li>
            <li>Email: ${talent.email}</li>
            <li>Phone: ${talent.phone}</li>
            <li>Skills: ${talent.skills.map(s => `${s.name} (${s.yearsOfExperience} years)`).join(', ')}</li>
          </ul>
          <p>Please review the profile at: ${process.env.ADMIN_DASHBOARD_URL}/talents/${talent._id}</p>
        `
      }
    };

    const template = emailTemplates[type];

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: adminEmail,
      subject: template.subject,
      html: template.html
    });
  }
}

module.exports = new EmailService();