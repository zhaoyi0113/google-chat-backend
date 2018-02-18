const express = require('express');

const querystring = require('querystring');

const url = require('url');
const {getAuthenticatedUrl} = require('./google_auth');

const router = express.Router();

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

router.get('/authenticate', (req, res) => {
	console.log(req);
	console.log(url.parse(req.url));
	const params = querystring.parse(url.parse(req.url).query);	"/authenticate?code=xxxxx"
	console.log('params=', params);
	res.send('Authentication successful! Please return to the console.'+params.code);
});



module.exports = {
	router
};
