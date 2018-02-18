const express = require('express');

const querystring = require('querystring');

const url = require('url');
const {getAuthenticatedUrl, oAuth2Client} = require('./google_auth');

const router = express.Router();

const FRONTEND_URL = process.env.DEV
  ? 'http://localhost:8082'
  : 'https://google-chat-frontend.herokuapp.com';

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
  console.log('params=', params.code);
  const r = await oAuth2Client.getToken(params.code);
	// Make sure to set the credentials on the OAuth2 client.
	console.log('get token ', r.tokens);
  oAuth2Client.setCredentials(r.tokens);
  res.writeHead(302, {Location: `${FRONTEND_URL}/#/chat/?token=${r.tokens.access_token}`});
  res.end();
});

module.exports = {
  router,
};
