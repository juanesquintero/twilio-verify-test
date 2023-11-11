const context = require('../context');

module.exports.send = async (request, response) => {
  const { phone } = request.body;

  try {
    const verification = await context.verification.check({ code, phone });
    sendResponse(verification);
  } catch (error) {
    return response.status(500).json({ error }).end();
  }
};

module.exports.check = async (request, response) => {
  const { code, phone } = request.body;

  try {
    const verification = await context.verification.check({ code, phone });
    sendResponse(verification, true);
  } catch (error) {
    return response.status(500).json({ error }).end();
  }
};

const sendResponse = (verification, validate = false) => {
  if (!verification) {
    return response.status(500).end();
  }
  const { sid, to, status, valid, ...other } = verification;

  if (validate) {
    if (!valid) {
      return response.status(401).end();
    }
  }

  return response.json({
    done: true,
    verification: { sid, to, status, valid },
  });
};
