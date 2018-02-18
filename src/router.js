const express = require('express');

const querystring = require('querystring');

const url = require('url');
const {getAuthenticatedUrl, oAuth2Client} = require('./google_auth');

const PORT = process.env.PORT || 3100;
const router = express.Router();

const FRONTEND_URL = process.env.DEV
  ? 'http://localhost:8082'
	: 'https://google-chat-frontend.herokuapp.com';
	
const BACKEND_URL = process.env.DEV? `http://localhost` : `https://google-chat-backend.herokuapp.com/api/v0/users`;
const SOCKET_PORT = PORT;

router.get('/users', (req, res) => {
  res.send({user: 'hello'});
});

router.post('/login', (req, res) => {
  const url = getAuthenticatedUrl();
  console.log('login url', url);
  // res.writeHead(302, {'Location': url});
  // res.end();
  res.send({url});
});

router.get('/authenticate', async (req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
  const r = await oAuth2Client.getToken(params.code);
	// Make sure to set the credentials on the OAuth2 client.
  oAuth2Client.setCredentials(r.tokens);
  res.writeHead(302, {Location: `${FRONTEND_URL}/#/chat/?token=${r.tokens.access_token}&url=${BACKEND_URL}:${SOCKET_PORT}`});
  res.end();
});

module.exports = {
  router,
};
