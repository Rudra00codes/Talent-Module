const { Twilio } = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

const client = new Twilio(accountSid, authToken);

async function sendWhatsAppMessage(toNumber, body) {
	if (!accountSid || !authToken || !fromNumber) {
		throw new Error('Twilio WhatsApp credentials are not configured');
	}
	if (!toNumber) throw new Error('Recipient WhatsApp number is required');

	return client.messages.create({
		body,
		from: `whatsapp:${fromNumber.replace('whatsapp:', '')}`,
		to: `whatsapp:${toNumber.replace('whatsapp:', '')}`,
	});
}

module.exports = { sendWhatsAppMessage };
