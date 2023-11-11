const context = require('../context');

const register = async (request, response) => {
  const { name, password, phone, twoFA } = request.body;

  const user = await context.repository.findUserByNameAndPassword(
    name,
    password
  );

  if (user) {
    return response.status(409).end();
  }

  await context.repository.create(name, password, phone, twoFA);

  response.json({ done: true });
};

module.exports = register;
