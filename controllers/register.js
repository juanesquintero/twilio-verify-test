const context = require('../context');

const register = async (request, response) => {
  const { name, password, phone, factor } = request.body;

  const user = await context.repository.findUserByNameAndPassword(
    name,
    password
  );

  if (user) {
    return response.status(409).end();
  }

  await context.repository.create(name, password, phone, factor);

  response.json({ done: true });
};

module.exports = register;
