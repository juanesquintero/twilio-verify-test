const fs = require('fs');
const mustache = require('mustache');

const helper = require('../shared/session-helper');

module.exports.password = (request, response) => {
  const page = fs.readFileSync('pages/change-password.html', 'utf8');

  const ids = ['current-password', 'new-password', 'new-password-confirmation'];

  const camelize = (s) =>
    s.replace(/(?:^|-)./g, (x) => ` ${x[x.length - 1].toUpperCase()}`).trim();

  const { user } = request.session;

  const view = {
    fields: ids.map((id) => ({ id, label: camelize(id) })),
    twoFA: helper.has2FactorAuthEnabled(user),
    userPairs: Object.entries(user).map(([key, value]) => ({ key, value })),
    user: JSON.stringify(user),
  };

  const render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.verify = (request, response) => {
  let page = fs.readFileSync('pages/verify.html', 'utf8');

  const user = request.body;
  user.twoFA = true;

  let render = mustache.render(page, { user: JSON.stringify(user) });

  response.status(200).send(render);
};

module.exports.register = (request, response) => {
  let page = fs.readFileSync('pages/register.html', 'utf8');
  let render = mustache.render(page, {});

  response.status(200).send(render);
};

module.exports.login = (request, response) => {
  let page = fs.readFileSync('pages/login.html', 'utf8');
  let render = mustache.render(page, {});

  response.status(200).send(render);
};

module.exports.profile = (request, response) => {
  let page = fs.readFileSync('pages/profile.html', 'utf8');

  const { user } = request.session;
  
  const { msg } = request.query;

  const twoFAuthEnable = helper.has2FactorAuthEnabled(user);

  const view = {
    name: user.name,
    pushIsDisabled: !twoFAuthEnable,
    pushIsEnabled: !!twoFAuthEnable,
    expiresIn: Math.round(request.session.cookie.maxAge / 1000 / 60),
    msg,
  };

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.pending = (request, response) => {
  let page = fs.readFileSync('pages/push-challenge-pending.html', 'utf8');

  const view = {
    name: request.session.user.name,
  };

  view.challengeSid = request.session.challenge.sid || '';

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.reject = (request, response) => {
  let page = fs.readFileSync('pages/push-challenge-rejected.html', 'utf8');

  const view = {};

  let render = mustache.render(page, view);

  response.status(200).send(render);
};

module.exports.logout = (request, response) => {
  request.session.destroy((error) => {
    response.redirect('/');
  });
};
