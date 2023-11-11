const twilio = require("twilio");

class VerificationManager {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async create(phone) {
    const verification = await this.client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    return verification;
  }

  async check({phone, code}) {
    const verification = await this.client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: code })

    return verification;
  }
}

module.exports = VerificationManager;
