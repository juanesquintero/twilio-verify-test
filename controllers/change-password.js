const context = require("../context");

const changePassword = async (request, response) => {
  const { name, current, newOne, confirmation  } = request.body;

  if (newOne !== confirmation) {
    return response.status(400).end();
  }

  const user = await context.repository.findUserByNameAndPassword(
    name,
    current
  );

  if (user) {
    return response.status(409).end();
  }

  await context.repository.updatePassword(id, newOne);

  response.json({ done: true });
};

module.exports = changePassword;