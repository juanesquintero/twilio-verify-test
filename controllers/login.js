const parser = require('ua-parser-js');

const helper = require('../session-helper');
const context = require('../context');

const login = async (request, response) => {
  const { name, password } = request.body;

  const user = await context.repository.findUserByNameAndPassword(
    name,
    password
  );

  if (!user) return response.status(403).end();

  request.session.user = user;
  request.session.cookie.expires = new Date(Date.now() + 10 * 60 * 1000);

  const payload = { id: user.id, redirect: '/profile' };

  // Factor Push for Mobile flow only 
  if (helper.hasPushVerificationEnabled(user)) {
    const agent = parser(request.headers['user-agent']);

    const fields = [
      { label: 'browser', value: agent?.browser?.name || 'default browser' },
    ];

    try {
      const challenge = await context.challenges.create(user, fields);
      request.session.challenge = challenge;
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  // 2 Factor Authentication for Web flow
  if (helper.has2FactorAuthEnabled(user)) {
    payload.redirect = '/verify/login';
    payload.phone = user.phone;
  }

  response.json(payload);
};

module.exports = login;
