const africastalking = require("africastalking")({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME,
});

const normalizePhone = require("./normalizePhone");

const sendSMS = async (phone, message) => {
  try {
    if (!phone || !message) throw new Error("Phone or message missing");

    //  Normalize to Africa's Talking preferred format: +2547..., +2541...
    let normalizedPhone = normalizePhone(phone, { format: "sms" });
    normalizedPhone = normalizedPhone.startsWith("+")
      ? normalizedPhone
      : `+${normalizedPhone}`;
    console.log(normalizedPhone);

    const result = await africastalking.SMS.send({
      to: [normalizedPhone],
      message,
    });

    console.log("SMS sent:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Failed to send SMS:", error.message || error);
    return null;
  }
};

module.exports = sendSMS;
