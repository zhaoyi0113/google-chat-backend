const express = require('express');

const querystring = require('querystring');

const url = require('url');
const {getAuthenticatedUrl, getToken} = require('./google_auth');

const PORT = process.env.PORT || 3100;
const router = express.Router();

const FRONTEND_URL = process.env.DEV
  ? 'http://localhost:8082'
	: 'https://google-chat-frontend.herokuapp.com';
	
const BACKEND_URL = process.env.DEV? `http://localhost` : `https://google-chat-backend.herokuapp.com/api/v0/users`;
const SOCKET_PORT = process.env.DEV? `:${PORT}` : '';

router.post('/login', (req, res) => {
  const url = getAuthenticatedUrl();
  console.log('login url', url);
  // res.writeHead(302, {'Location': url});
  // res.end();
  res.send({url});
});

router.get('/authenticate', async (req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
	const tokens = await getToken(params.code);
	console.log('authenticate:', BACKEND_URL, process.env.DEV);
  res.writeHead(302, {Location: `${FRONTEND_URL}/#/chat/?token=${tokens.token}&url=${BACKEND_URL}${SOCKET_PORT}&username=${tokens.user.name}`});
  res.end();
});

module.exports = {
  router,
};
