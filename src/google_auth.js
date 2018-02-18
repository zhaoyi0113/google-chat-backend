const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const keys = require('./keys.json');

const getAuthenticatedUrl = () => {
	const oAuth2Client = new OAuth2Client(
		keys.web.client_id,
		keys.web.client_secret,
		keys.web.redirect_uris[0]
	);

	// Generate the url that will be used for the consent dialog.
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/plus.me'
	});
	return authorizeUrl;
};

module.exports = {
	getAuthenticatedUrl
};
