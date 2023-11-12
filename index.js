require('dotenv').config();

const context = require('./context');

const http = require('http');
const express = require('express');
const session = require('express-session');
const { registerWebsocketServer } = require('./websocket-server');

const register = require('./controllers/register');
const login = require('./controllers/login');
const verify = require('./controllers/verify');
const devices = require('./controllers/devices');
const challenges = require('./controllers/challenges');
const pages = require('./controllers/pages');

const validateSessionWithMultifactor = require('./middlewares/validate-session-with-multifactor');
const validateSession = require('./middlewares/validate-session');

const ChallengeManager = require('./shared/challenge-manager');
const DeviceManager = require('./shared/device-manager');
const UserRepository = require('./shared/user-repository');
const VerificationManager = require('./shared/verification-manager');

context.repository = new UserRepository();
context.devices = new DeviceManager();
context.challenges = new ChallengeManager();
context.verification = new VerificationManager();

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(context.configuration));

// controllers
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/verify/send', verify.send);
app.post('/api/verify/check', verify.check);

// middleware to validate session
app.post('/api/devices/token', validateSession, devices.token);
app.post('/api/devices/register', validateSession, devices.register);

app.post('/api/challenges/update-webhook', challenges.update);
app.get('/api/challenges/status', validateSession, challenges.status);

app.get('/push-challenge-pending', validateSession, pages.pending);
app.get('/profile', validateSessionWithMultifactor, pages.profile);
app.get(
  '/profile/change-password',
  validateSessionWithMultifactor,
  pages.password
);
app.get('/logout', validateSessionWithMultifactor, pages.logout);
app.get('/reject', pages.reject);
app.get('/', pages.login);
app.get('/login', pages.login);
app.get('/register', pages.register);
app.post('/verify/:flow', pages.verify);

app.use(express.static('public'));

const port = process.env.PORT || '5000';

const server = http.createServer(app);

registerWebsocketServer(server);

server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
