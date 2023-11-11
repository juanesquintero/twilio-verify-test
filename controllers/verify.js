const context = require('../context');

module.exports.send = async (request, response) => {
  const { phone } = request.body;

  const op = async () => {
    const verification = await context.verification.create(phone);
    sendResponse(verification, response);
  };

  handleError(op, response);
};

module.exports.check = async (request, response) => {
  const { code, phone } = request.body;

  const op = async () => {
    const verification = await context.verification.check({ code, phone });
    sendResponse(verification, response, true);
  };
  handleError(op, response);
};

const handleError = async (cb, response) => {
  try {
    await cb();
  } catch (err) {
    const error = err?.message ?? String(err);
    return response.status(500).json({ error }).end();
  }
};

const sendResponse = (verification, response, validate = false) => {
  if (!verification) {
    return response.status(500).end();
  }
  const { sid, to, status, valid, ...other } = verification;

  if (validate && !valid) {
    return response.status(401).end();
  }

  return response.json({
    done: true,
    verification: { sid, to, status, valid },
  });
};
