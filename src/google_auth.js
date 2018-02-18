const {OAuth2Client} = require('google-auth-library');
const url = require('url');
const rp = require('request-promise');

const querystring = require('querystring');
const keys = require('./keys.json');

const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

const userCache = {};

const getAuthenticatedUrl = () => {
  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  return authorizeUrl;
};

const getToken = async code => {
  const r = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(r.tokens);
  const data = await rp(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${
      r.tokens.access_token
    }`
  );
  console.log('data:', data);
  const userProfile = JSON.parse(data);
  userCache[r.tokens.access_token] = userProfile;
  return {token: r.tokens.access_token, user: userProfile};
};

const getUser = token => userCache[token];

module.exports = {
  getAuthenticatedUrl,
  getToken,
  getUser,
};
