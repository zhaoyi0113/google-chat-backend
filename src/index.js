const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {router} = require('./router');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const baseUrl = '/api/v0/';

app.use(baseUrl, router);

app
  .listen(3100, () => {
    console.log('server is listen on 3100');
  })
  .on('error', err => console.log(err));