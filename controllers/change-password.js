const context = require('../context');

const changePassword = async (request, response) => {
  const { current, newOne, confirmation } = request.body;
  const { id, name } = request.body.user;

  if (newOne !== confirmation) {
    return response.status(400).end();
  }

  const user = await context.repository.findUserByNameAndPassword(
    name,
    current
  );

  if (!user) {
    return response.status(404).end();
  }

  await context.repository.updatePassword(id, newOne);

  response.json({ done: true });
};

module.exports = changePassword;
